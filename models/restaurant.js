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
      this.hasMany(models.Rating, {
        foreignKey: "restaurant_id",
        as: "ratings",
      });
      this.hasMany(models.Order, {
        foreignKey: "order_id",
        as: "orders",
      });
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "manager",
      });
      this.belongsTo(models.Address, {
        foreignKey: "address_id",
        as: "address",
      });
    }
  }

  Restaurant.init(
    {
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      address_id: {
        type: DataTypes.UUID,
        references: {
          model: "Addresses",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      name: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Name must be unique",
        },
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
