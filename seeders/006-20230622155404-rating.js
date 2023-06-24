"use strict";
const { sequelize } = require("../models");
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await sequelize.models.User.findAll();

    const restaurant = await sequelize.models.Restaurant.findAll();

    const ratings = [];
    for (let i = 0; i < 100; i++) {
      ratings.push({
        id: Sequelize.literal("uuid_generate_v4()"),
        user_id: users[Math.floor(Math.random() * users.length)].id,
        restaurant_id:
          restaurant[Math.floor(Math.random() * restaurant.length)].id,
        rating_value: faker.number.int({ min: 1, max: 5 }),
        review: faker.lorem.sentences(3),
        review_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert("Ratings", ratings);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Ratings", null, {});
  },
};
