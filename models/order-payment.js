"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderPayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "order",
      });
      this.belongsTo(models.PaymentMethod, {
        foreignKey: "payment_method_id",
        as: "payment_method",
      });
    }
  }
  OrderPayment.init(
    {
      order_id: {
        type: DataTypes.UUID,
        references: {
          model: "Orders",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      payment_method_id: {
        type: DataTypes.UUID,
        references: {
          model: "PaymentMethods",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      amount: {
        type: DataTypes.DOUBLE,
      },
      transaction_id: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("pending", "completed", "failed"),
        defaultValue: "pending",
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "OrderPayment",
      tableName: "OrderPayments",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      underscored: true,
    }
  );
  return OrderPayment;
};
