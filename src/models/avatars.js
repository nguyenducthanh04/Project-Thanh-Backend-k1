"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class avatars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      avatars.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  avatars.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fileName: DataTypes.STRING,
      filePath: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "avatars",
      tableName: "avatars",
    }
  );
  return avatars;
};
