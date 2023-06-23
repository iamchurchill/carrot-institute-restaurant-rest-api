"use strict";
const { sequelize } = require("../models");
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const menus = [];
    for (let i = 0; i < 100; i++) {
      menus.push({
        id: Sequelize.literal("uuid_generate_v4()"),
        restaurant_id: null,
        name: faker.name.fullName(),
        description: faker.lorem.paragraph(),
        price: null,
        image_url: faker.image.avatar(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert("Menus", menus);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Menus", null, {});
  },
};
