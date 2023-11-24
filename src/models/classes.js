"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      classes.belongsTo(models.courses, {
        foreignKey: "courseId",
      });
      classes.belongsToMany(models.User, {
        through: "classes_teachers",
        foreignKey: "classId",
      });
      classes.hasMany(models.teacher_calendar, {
        foreignKey: "classId",
      });
      classes.hasMany(models.students_classes, {
        foreignKey: "classId",
      });
      classes.hasMany(models.students_attendance, {
        foreignKey: "classId",
      });
      classes.hasMany(models.exercises, {
        foreignKey: "classId",
      });
      classes.hasMany(models.comments, {
        foreignKey: "classId",
      });
    }
  }
  classes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      schedule: DataTypes.TINYINT,
      courseId: DataTypes.INTEGER,
      timeLearn: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "classes",
    }
  );
  return classes;
};
