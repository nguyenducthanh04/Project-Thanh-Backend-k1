"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class exercises extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // exercises.belongsTo(models.classes, {
      //   foreignKey: "studentId",
      // });
      exercises.hasMany(models.exercises_submit);
    }
  }
  exercises.init(
    {
      classId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      attachment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "exercises",
    }
  );
  return exercises;
};
