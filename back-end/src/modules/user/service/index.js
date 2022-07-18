const {
  NotFoundError,
  ConflictError,
  UnauthorizedError,
} = require('restify-errors');

const CustomerModel = require('../model');

const { validate, encrypt } = require('../../../shared/utils/encrypt');
const { generateToken } = require('../../../shared/utils/auth');

const INVALID_EMAIL_OR_PASSWORD = 'Invalid email or password';

const findAll = async (role) => {
  if (role === 'administrator') {
    throw new UnauthorizedError(
      'You are not authorized to access this resource',
    );
  }

  const foundCustomers = await CustomerModel.findAll(role);

  return {
    statusCode: 200,
    payload: foundCustomers,
  };
};

const login = async ({ email, password }) => {
  const foundCustomer = await CustomerModel.findByEmail(email);

  if (!foundCustomer) {
    throw new NotFoundError(INVALID_EMAIL_OR_PASSWORD);
  }

  if (!validate(password, foundCustomer.password)) {
    throw new NotFoundError(INVALID_EMAIL_OR_PASSWORD);
  }

  const { id, name, role } = foundCustomer;
  const token = generateToken({ id, role });

  return {
    statusCode: 200,
    payload: { name, role, email, token },
  };
};

const register = async ({ name, email, password }) => {
  const foundCustomer = await CustomerModel.findByEmail(email);

  if (foundCustomer) {
    throw new ConflictError('Email already exists');
  }

  const newCustomer = await CustomerModel.create({
    name,
    email,
    password: encrypt(password),
  });

  const { id, role } = newCustomer;
  const token = generateToken({ id, role });

  return {
    statusCode: 201,
    payload: { name, role, email, token },
  };
};

module.exports = {
  findAll,
  login,
  register,
};
