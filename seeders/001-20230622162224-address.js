"use strict";
const { sequelize } = require("../models");
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await sequelize.models.User.findAll();

    const addresses = [];
    for (let i = 0; i < users.length; i++) {
      addresses.push({
        id: Sequelize.literal("uuid_generate_v4()"),
        user_id: users[i].id,
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        region: faker.location.state(),
        country: faker.location.country(),
        post_gps: `GS-${faker.number.int({
          min: 1000,
          max: 9999,
        })}-${faker.number.int({ min: 1000, max: 9999 })}`,
        is_default: true,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert("Addresses", addresses);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Addresses", null, {});
  },
};
