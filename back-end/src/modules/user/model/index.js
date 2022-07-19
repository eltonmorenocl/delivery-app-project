const { Op } = require('sequelize');

const { User } = require('../../../database/models');

const findAll = async (role) => {
  const users = await User.findAll({
    where: {
      role: {
        [Op.like]: `%${role || ''}%`,
      },
    },
    attributes: ['id', 'name', 'role'],
  });

  return users;
};

const findById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: ['id', 'name', 'role'],
  });

  return user;
};

const findByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
  });

  return user;
};

const findByName = async (name) => {
  const user = await User.findOne({
    where: { name },
  });

  return user;
};

const create = async ({ name, email, password, role = 'customer' }) => {
  const data = { name, email, password, role };
  const user = await User.create(data, {
    attributes: ['id', 'name', 'role'],
  });

  return user;
};

const destroy = async (id) => {
  await User.destroy({
    where: { id },
  });
};

module.exports = {
  findAll,
  findById,
  findByEmail,
  findByName,
  create,
  destroy,
};
