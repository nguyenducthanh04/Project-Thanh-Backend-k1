"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_socials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_socials.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  user_socials.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: DataTypes.INTEGER,
      provider: DataTypes.STRING,
      providerId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user_socials",
    }
  );
  return user_socials;
};
