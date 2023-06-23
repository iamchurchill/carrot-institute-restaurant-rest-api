"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Delivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Delivery.init(
    {
      order_id: {
        type: DataTypes.UUID,
        references: {
          model: "Order",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
      start_time: {
        type: DataTypes.DATE,
      },
      end_time: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.ENUM("on the way", "nearby", "delivered"),
        defaultValue: "on the way",
      },
      geo_point: {
        type: DataTypes.GEOMETRY("POINT"),
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Delivery",
      tableName: "Deliveries",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      underscored: true,
    }
  );
  return Delivery;
};
