"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class login_tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      login_tokens.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  login_tokens.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: DataTypes.INTEGER,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "login_tokens",
    }
  );
  return login_tokens;
};
