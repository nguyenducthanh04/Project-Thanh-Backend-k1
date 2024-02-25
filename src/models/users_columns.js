"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users_columns extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users_columns.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  users_columns.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: DataTypes.INTEGER,
      featureName: DataTypes.STRING,
      status: DataTypes.TINYINT,
      position: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "users_columns",
      tableName: "users_columns",
    }
  );
  return users_columns;
};
