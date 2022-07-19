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

const register = async ({ name, email, password, role }) => {
  const foundCustomerByEmail = await CustomerModel.findByEmail(email);
  if (foundCustomerByEmail) throw new ConflictError('Email already exists');

  const foundCustomerByName = await CustomerModel.findByName(name);
  if (foundCustomerByName) throw new ConflictError('Name already exists');

  const newCustomer = await CustomerModel.create({
    name,
    email,
    password: encrypt(password),
    role,
  });

  const { id } = newCustomer;
  const token = generateToken({ id, role });

  return {
    statusCode: 201,
    payload: { name, role, email, token },
  };
};

const destroy = async (role, id) => {
  if (role !== 'administrator') {
    throw new UnauthorizedError(
      'You are not authorized to access this resource',
    );
  }

  const foundCustomer = await CustomerModel.findById(id);

  if (!foundCustomer) {
    throw new NotFoundError('Customer not found');
  }

  await CustomerModel.destroy(id);

  return {
    statusCode: 204,
    payload: null,
  };
};

module.exports = {
  findAll,
  login,
  register,
  destroy,
};
