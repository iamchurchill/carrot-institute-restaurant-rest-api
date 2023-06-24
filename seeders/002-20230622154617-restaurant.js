"use strict";
const { sequelize } = require("../models");
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const managers = await sequelize.models.User.findAll({
      where: {
        type: "manager",
      },
    });

    const address = await sequelize.models.Address.findAll();

    const restaurants = [];
    for (let i = 0; i < 50; i++) {
      restaurants.push({
        id: Sequelize.literal("uuid_generate_v4()"),
        name: `${faker.commerce.productAdjective()} ${faker.company.catchPhraseDescriptor()} Restaurant`,
        user_id: managers[Math.floor(Math.random() * managers.length)].id,
        address_id: address[Math.floor(Math.random() * address.length)].id,
        msisdn: faker.phone.number("23354#######"),
        email: faker.internet.email(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert("Restaurants", restaurants);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Restaurants", null, {});
  },
};
