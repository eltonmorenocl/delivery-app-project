const { Router } = require('express');

const CostumerController = require('../../../modules/user/controller');

const { authHandler } = require('../middleware/Validators');

const {
  validateUserLogin,
  validateUserRegister,
} = require('../middleware/Validators/user.validator');

const userRouter = Router();

userRouter.get('/', authHandler, CostumerController.findAll);

userRouter.post('/login', validateUserLogin, CostumerController.login);
userRouter.post('/register', validateUserRegister, CostumerController.register);

module.exports = { userRouter };
