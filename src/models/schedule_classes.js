"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class scheduleclasses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      scheduleclasses.belongsTo(models.classes, {
        foreignKey: "classId",
      });
    }
  }
  scheduleclasses.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      schedule: DataTypes.TINYINT(1),
      timeLearn: DataTypes.STRING(50),
      classId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "scheduleclasses",
    }
  );
  return scheduleclasses;
};
