"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rating.init(
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
      rating_value: {
        type: DataTypes.INTEGER,
      },
      review: {
        type: DataTypes.STRING,
      },
      review_date: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Rating",
      tableName: "Ratings",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      underscored: true,
    }
  );
  return Rating;
};
