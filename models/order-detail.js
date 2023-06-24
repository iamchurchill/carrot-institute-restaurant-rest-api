"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
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
      this.belongsTo(models.Menu, {
        foreignKey: "menu_id",
        as: "menu",
      });
    }
  }
  OrderDetail.init(
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
      menu_id: {
        type: DataTypes.UUID,
        references: {
          model: "Menus",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "OrderDetail",
      tableName: "OrderDetails",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      underscored: true,
    }
  );
  return OrderDetail;
};
