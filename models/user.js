"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Address, {
        foreignKey: "user_id",
        as: "addresses",
      });
      this.hasMany(models.Token, {
        foreignKey: "user_id",
        as: "tokens",
      });
      this.hasMany(models.PaymentMethod, {
        foreignKey: "user_id",
        as: "payment_method",
      });
      this.hasMany(models.Delivery, {
        foreignKey: "delivery_person_id",
        as: "deliveries",
      });
    }
  }
  User.init(
    {
      first_name: {
        type: DataTypes.STRING(50),
      },
      last_name: {
        type: DataTypes.STRING(50),
      },
      email: {
        type: DataTypes.STRING(50),
        unique: {
          args: true,
          msg: "Email must be unique",
        },
      },
      password: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      msisdn: {
        type: DataTypes.STRING(15),
        unique: {
          args: true,
          msg: "Msisdn must be unique",
        },
      },
      type: {
        type: DataTypes.ENUM("customer", "delivery_person", "manager"),
        defaultValue: "customer",
      },
      registration_date: {
        type: DataTypes.DATE,
      },
      last_login: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "User",
      tableName: "Users",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      underscored: true,
    }
  );
  return User;
};
