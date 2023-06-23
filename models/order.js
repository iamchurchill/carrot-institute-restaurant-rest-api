"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: "User",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      restaurant_id: {
        type: DataTypes.UUID,
        references: {
          model: "Restaurant",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      order_date: {
        type: DataTypes.DATE,
      },
      total_amount: {
        type: DataTypes.DECIMAL,
      },
      delivery_person_id: {
        type: DataTypes.UUID,
        references: {
          model: "DeliveryPerson",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      status: {
        type: DataTypes.ENUM(
          "placed",
          "accepted",
          "in preparation",
          "in delivery",
          "delivered"
        ),
        defaultValue: "placed",
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Order",
      tableName: "Orders",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      underscored: true,
    }
  );
  return Order;
};
