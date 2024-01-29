"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class exercises_submit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      exercises_submit.belongsTo(models.User);
      exercises_submit.belongsTo(models.exercises);
    }
  }
  exercises_submit.init(
    {
      studentId: DataTypes.INTEGER,
      exerciseId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      attachment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "exercises_submit",
    }
  );
  return exercises_submit;
};
