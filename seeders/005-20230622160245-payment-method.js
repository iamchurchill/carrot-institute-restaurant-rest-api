"use strict";
const { sequelize } = require("../models");
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await sequelize.models.User.findAll();

    const paymentMethods = [];
    for (let i = 0; i < 100; i++) {
      paymentMethods.push({
        id: Sequelize.literal("uuid_generate_v4()"),
        user_id: users[Math.floor(Math.random() * users.length)].id,
        type: faker.helpers.arrayElement([
          "credit card",
          "debit card",
          "cash on delivery",
          "digital wallet",
        ]),
        card_number: faker.finance.creditCardNumber(),
        expiration_date: faker.date.future().toISOString().split("T")[0],
        cvv: faker.finance.creditCardCVV(),
        digital_wallet_name: faker.finance.bitcoinAddress(),
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
