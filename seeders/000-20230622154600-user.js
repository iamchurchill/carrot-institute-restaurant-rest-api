"use strict";
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    users.push({
      id: Sequelize.literal("uuid_generate_v4()"),
      first_name: "FRIEDRICH",
      last_name: "SAM",
      email: "churchillmerediths@gmail.com",
      password: bcrypt.hashSync("admin", 10),
      msisdn: faker.phone.number("233545972039"),
      type: "manager",
      registration_date: new Date(),
      last_login: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    });
    for (let i = 0; i < 200; i++) {
      users.push({
        id: Sequelize.literal("uuid_generate_v4()"),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync("admin", 10),
        msisdn: faker.phone.number("23354#######"),
        type: faker.helpers.arrayElement([
          "customer",
          "delivery_person",
          "manager",
        ]),
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
