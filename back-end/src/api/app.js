const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

require('express-async-errors');

const {
  userRouter,
  productsRouter,
  saleRouter,
} = require('../shared/http/routes');
const { errorHandler } = require('../shared/http/middleware/ErrorHandler');

const swaggerFile = require('../swagger.json');

const app = express();

// app.get('/coffee', (_req, res) => res.status(418).end());
app.use(express.json());
app.use(cors('*'));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/products', productsRouter);
app.use('/user', userRouter);
app.use('/sales', saleRouter);
app.use(express.static('public'));

app.use(errorHandler);

module.exports = app;
