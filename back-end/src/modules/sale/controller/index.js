const SaleService = require('../service');

const findAll = async (req, res) => {
  const { id, role } = req.user;

  const { statusCode, payload } = await SaleService.findAll(role, id);

  return res.status(statusCode).json(payload);
};

const findById = async (req, res) => {
  const { id, role } = req.user;
  const { id: saleId } = req.params;

  const { statusCode, payload } = await SaleService.findById(role, id, saleId);

  return res.status(statusCode).json(payload);
};

const updatePending = async (req, res) => {
  const { role } = req.user;
  const { id } = req.params;
  
  const { statusCode, payload } = await SaleService.updatePending(id, role);

  return res.status(statusCode).json(payload);
};

const updatePreparing = async (req, res) => {
  const { role } = req.user;
  const { id } = req.params;
  
  const { statusCode, payload } = await SaleService.updatePreparing(id, role);

  return res.status(statusCode).json(payload);
};

const updateDelivering = async (req, res) => {
  const { role } = req.user;
  const { id } = req.params;
  
  const { statusCode, payload } = await SaleService.updateDelivering(id, role);

  return res.status(statusCode).json(payload);
};

const updateDelivered = async (req, res) => {
  const { role } = req.user;
  const { id } = req.params;
  
  const { statusCode, payload } = await SaleService.updateDelivered(id, role);

  return res.status(statusCode).json(payload);
};

const create = async (req, res) => {
  const { id, role } = req.user;

  const response = await SaleService.create(role, id, req.body);

  return res.status(response.statusCode).json({ id: response.id });
};

module.exports = {
  findAll,
  findById,
  updatePending,
  updatePreparing,
  updateDelivering,
  updateDelivered,
  create,
};
