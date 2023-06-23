"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Restaurant.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Name must be unique",
        },
      },
      user_id: {
        //Restaurant admin ID -> User table ID
        type: DataTypes.UUID,
        references: {
          model: "Address",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      address_id: {
        //Restaurant address ID -> Address table ID
        type: DataTypes.UUID,
        references: {
          model: "Address",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      msisdn: {
        type: DataTypes.STRING(15),
      },
      email: {
        type: DataTypes.STRING(50),
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Restaurant",
      tableName: "Restaurants",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      underscored: true,
    }
  );
  return Restaurant;
};
