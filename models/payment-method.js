"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
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
      this.hasMany(models.OrderPayment, {
        foreignKey: "payment_method_id",
        as: "order_payment",
      });
    }
  }
  PaymentMethod.init(
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
      type: {
        type: DataTypes.ENUM(
          "credit card",
          "debit card",
          "cash on delivery",
          "digital wallet"
        ),
      },
      card_number: { type: DataTypes.STRING },
      expiration_date: { type: DataTypes.DATE },
      cvv: { type: DataTypes.STRING },
      digital_wallet_name: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "PaymentMethod",
      tableName: "PaymentMethods",
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true,
    }
  );
  return PaymentMethod;
};
