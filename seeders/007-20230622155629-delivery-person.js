"use strict";
const { sequelize } = require("../models");
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const deliveryPeople = [];
    for (let i = 0; i < 50; i++) {
      deliveryPeople.push({
        id: Sequelize.literal("uuid_generate_v4()"),
        name: faker.name.fullName(),
        msisdn: faker.phone.number("23354#######"),
        email: faker.internet.email(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert("DeliveryPeople", deliveryPeople);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("DeliveryPeople", null, {});
  },
};
