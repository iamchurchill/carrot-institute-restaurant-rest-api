"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Menu.init(
    {
      restaurant_id: {
        //Restaurant ID -> User table ID
        type: DataTypes.UUID,
        references: {
          model: "Address",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      name: {
        type: DataTypes.STRING(50),
      },
      description: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DOUBLE,
      },
      image_url: {
        type: DataTypes.STRING(50),
      },
      available: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Menu",
      tableName: "Menus",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      underscored: true,
    }
  );
  return Menu;
};
