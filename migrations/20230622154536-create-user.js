"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        primaryKey: true,
        allowNull: false,
      },
      default_address_id: {
        type: Sequelize.UUID,
        references: {
          model: "Address",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      first_name: {
        type: Sequelize.STRING(50),
      },
      last_name: {
        type: Sequelize.STRING(50),
      },
      email: {
        type: Sequelize.STRING(50),
        unique: {
          args: true,
          msg: "Email must be unique",
        },
      },
      password: {
        type: Sequelize.STRING(50),
        defaultValue: null,
      },
      msisdn: {
        type: Sequelize.STRING(15),
        unique: {
          args: true,
          msg: "Msisdn must be unique",
        },
      },
      user_type: {
        type: Sequelize.ENUM("customer", "delivery_person", "admin"),
      },
      registration_date: {
        type: Sequelize.DATE,
      },
      last_login: {
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
        field: "deleted_at",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
