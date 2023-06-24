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
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      this.belongsTo(models.Restaurant, {
        foreignKey: "restaurant_id",
        as: "restaurant",
      });
      this.belongsTo(models.Address, {
        foreignKey: "address_id",
        as: "address",
      });
      this.hasOne(models.Delivery, {
        foreignKey: "order_id",
        as: "delivery",
      });
      this.hasOne(models.OrderDetail, {
        foreignKey: "order_id",
        as: "order_detail",
      });
      this.hasOne(models.OrderPayment, {
        foreignKey: "order_id",
        as: "order_payment",
      });
    }
  }
  Order.init(
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
      restaurant_id: {
        type: DataTypes.UUID,
        references: {
          model: "Restaurants",
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
      order_date: {
        type: DataTypes.DATE,
      },
      total_amount: {
        type: DataTypes.DECIMAL,
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
