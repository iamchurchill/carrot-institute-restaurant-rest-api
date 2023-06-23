"use strict";
const { sequelize } = require("../models");
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    for (let i = 0; i < 100; i++) {
      users.push({
        id: Sequelize.literal("uuid_generate_v4()"),
        default_address_id: null,
        first_name: faker.internet.userName(),
        last_name: faker.internet.userName(),
        email: faker.internet.email(),
        password: null,
        msisdn: faker.phone.number("23354#######"),
        registration_date: new Date(),
        last_login: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
