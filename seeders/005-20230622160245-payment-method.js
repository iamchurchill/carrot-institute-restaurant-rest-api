"use strict";
const { sequelize } = require("../models");
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const paymentMethods = [];
    for (let i = 0; i < 100; i++) {
      paymentMethods.push({
        id: Sequelize.literal("uuid_generate_v4()"),
        user_id: null,
        type: faker.helpers.arrayElement([
          "credit card",
          "debit  card",
          "cash on delivery",
          "digital wallet",
        ]),
        card_number: null,
        expiration_date: null,
        cvv: null,
        digital_wallet_name: null,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert("PaymentMethods", paymentMethods);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PaymentMethods", null, {});
  },
};
