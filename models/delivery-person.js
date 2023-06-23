"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DeliveryPerson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DeliveryPerson.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      msisdn: {
        type: DataTypes.STRING(15),
        unique: {
          args: true,
          msg: "Msisdn must be unique",
        },
      },
      email: {
        type: DataTypes.STRING(50),
        unique: {
          args: true,
          msg: "Email must be unique",
        },
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "DeliveryPerson",
      tableName: "DeliveryPeople",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      underscored: true,
    }
  );
  return DeliveryPerson;
};
