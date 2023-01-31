const { UnauthorizedError } = require('restify-errors');

const Auth = require('../../../utils/auth');

const authHandler = async (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError('Token not provided');
  }

  const decoded = Auth.verifyToken(authorization);

  req.user = decoded;

  return next();
};

module.exports = { authHandler };
