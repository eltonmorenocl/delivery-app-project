"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert("sales", [
      {
        user_id: 3,
        seller_id: 2,
        total_price: 100.0,
        delivery_address: "Rua dos Bobos",
        delivery_number: "678",
        sale_date: Sequelize.literal("CURRENT_TIMESTAMP"),
        status: "Em Trânsito",
      },
      {
        user_id: 3,
        seller_id: 2,
        total_price: 200.0,
        delivery_address: "Rua dos Bobos",
        delivery_number: "678",
        sale_date: Sequelize.literal("CURRENT_TIMESTAMP"),
        status: "Pendente",
      },
      {
        user_id: 3,
        seller_id: 2,
        total_price: 300.0,
        delivery_address: "Rua dos Bobos",
        delivery_number: "678",
        sale_date: Sequelize.literal("CURRENT_TIMESTAMP"),
        status: "Em Trânsito",
      },
    ]),

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("sales", null, {}),
};
