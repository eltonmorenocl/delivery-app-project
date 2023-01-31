const {
  Sale,
  Product,
  SaleProduct,
  User,
} = require('../../../database/models');

const {
  sellerSaleReturnNormalizer,
  detailedSaleFormatter,
} = require('../../../shared/utils/normalizer');

const findAllByCostumer = async (costumerId) => {
  const sales = await Sale.findAll({
    where: { userId: costumerId },
    attributes: {
      exclude: ['userId', 'sellerId', 'deliveryAddress', 'deliveryNumber'],
    },
  });

  return sales;
};

const findAllBySeller = async (sellerId) => {
  const sales = await Sale.findAll({
    where: { sellerId },
    attributes: { exclude: ['userId', 'sellerId'] },
    order: [['id', 'DESC']],
  });

  return sellerSaleReturnNormalizer(sales);
};

const findByIdByCostumer = async (costumerId, saleId) => {
  const sale = await Sale.findOne({
    where: { id: saleId, userId: costumerId },
    include: [
      {
        model: User,
        as: 'seller',
        attributes: ['id', 'name'],
      },
      {
        model: Product,
        as: 'products',
        through: { attributes: ['quantity'], as: 'saleProduct' },
        attributes: { exclude: ['urlImage'] },
      },
    ],
    attributes: ['id', 'totalPrice', 'saleDate', 'status'],
  });

  return sale ? detailedSaleFormatter(sale) : null;
};

const findByIdBySeller = async (sellerId, saleId) => {
  const sale = await Sale.findOne({
    where: { id: saleId, sellerId },
    include: [
      {
        model: Product,
        as: 'products',
        through: { attributes: ['quantity'], as: 'saleProduct' },
        attributes: { exclude: ['urlImage'] },
      },
    ],
    attributes: ['id', 'totalPrice', 'saleDate', 'status'],
  });

  return sale ? detailedSaleFormatter(sale) : null;
};

const findByIdByPending = async (id) => {
  const sale = await Sale.findOne({ where: { id } });

  if (!sale) return null;

  await Sale.update({ status: 'Pendente' }, { where: { id } });
  return true;
};

const findByIdByPreparing = async (id) => {
  const sale = await Sale.findOne({ where: { id } });

  if (!sale) return null;

  await Sale.update({ status: 'Preparando' }, { where: { id } });
  return true;
};

const findByIdByDelivering = async (id) => {
  const sale = await Sale.findOne({ where: { id } });

  if (!sale) return null;

  await Sale.update({ status: 'Em Trânsito' }, { where: { id } });
  return true;
};

const findByIdByDelivered = async (id) => {
  const sale = await Sale.findOne({ where: { id } });

  if (!sale) return null;

  await Sale.update({ status: 'Entregue' }, { where: { id } });
  return true;
};

const createNewSale = async ({
  userId,
  sellerId,
  totalPrice,
  saleDate,
  deliveryAddress,
  deliveryNumber,
}) => {
  const newSale = await Sale.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status: 'Pendente',
  });
  return newSale;
};

const addProductToSale = async ({ saleId, productId, quantity }) => {
  await SaleProduct.create({
    saleId,
    productId,
    quantity,
  });
};

module.exports = {
  findAllByCostumer,
  findAllBySeller,
  findByIdByCostumer,
  findByIdBySeller,
  findByIdByPending,
  findByIdByPreparing,
  findByIdByDelivering,
  findByIdByDelivered,
  createNewSale,
  addProductToSale,
};
