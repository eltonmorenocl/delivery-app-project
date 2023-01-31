const { celebrate, Joi, Segments } = require('celebrate');

const validateSaleCreate = celebrate({
  [Segments.BODY]: Joi.object({
    sellerId: Joi.number().required(),
    totalPrice: Joi.number().min(1).required(),
    saleDate: Joi.date().required(),
    address: Joi.object({
      street: Joi.string().required(),
      number: Joi.number().required(),
    }).required(),
    orders: Joi.array().required().items(
      Joi.object({
        id: Joi.number().required(),
        quantity: Joi.number().required(),
      }).required(),
    ),
  }),
});

module.exports = { validateSaleCreate };
