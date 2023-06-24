"use strict";
const { sequelize } = require("../models");
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await sequelize.models.User.findAll();

    const addresses = [];
    for (let i = 0; i < 100; i++) {
      addresses.push({
        id: Sequelize.literal("uuid_generate_v4()"),
        user_id: users[Math.floor(Math.random() * users.length)].id,
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        region: faker.location.state(),
        country: faker.location.country(),
        post_gps: "GS-0258-5081",
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
