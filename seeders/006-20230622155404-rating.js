"use strict";
const { sequelize } = require("../models");
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const ratings = [];
    for (let i = 0; i < 100; i++) {
      ratings.push({
        id: Sequelize.literal("uuid_generate_v4()"),
        user_id: null,
        restaurant_id: null,
        rating_value: null,
        review: null,
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
