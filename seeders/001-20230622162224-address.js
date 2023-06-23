"use strict";
const { sequelize } = require("../models");
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const addresses = [];
    for (let i = 0; i < 100; i++) {
      addresses.push({
        id: Sequelize.literal("uuid_generate_v4()"),
        user_id: null,
        street: null,
        city: null,
        region: null,
        country: null,
        post_gps: null,
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
