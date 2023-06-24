"use strict";
const { sequelize } = require("../models");
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const restaurant = await sequelize.models.Restaurant.findAll();

    const menus = [];
    for (let i = 0; i < 100; i++) {
      menus.push({
        id: Sequelize.literal("uuid_generate_v4()"),
        restaurant_id:
          restaurant[Math.floor(Math.random() * restaurant.length)].id,
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        price: faker.commerce.price(),
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
