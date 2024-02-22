"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class student_courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      student_courses.belongsTo(models.User, {
        foreignKey: "studentId",
      });
      student_courses.belongsTo(models.courses, {
        foreignKey: "courseId",
      });
      student_courses.belongsTo(models.learning_status, {
        foreignKey: "statusId",
      });
    }
  }
  student_courses.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      studentId: DataTypes.INTEGER,
      courseId: DataTypes.INTEGER,
      statusId: DataTypes.INTEGER,
      completedDate: DataTypes.DATE,
      dropDate: DataTypes.DATE,
      recover: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "student_courses",
    }
  );
  return student_courses;
};
