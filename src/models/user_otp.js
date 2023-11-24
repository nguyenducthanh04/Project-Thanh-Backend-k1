"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_otp.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  user_otp.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      otp: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      expires: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "user_otp",
    }
  );
  return user_otp;
};
