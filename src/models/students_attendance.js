"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class students_attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      students_attendance.belongsTo(models.User, {
        foreignKey: "studentId",
      });
      students_attendance.belongsTo(models.classes, {
        foreignKey: "classId",
      });
      students_attendance.belongsTo(models.learning_status);
    }
  }
  students_attendance.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      dateLearning: DataTypes.DATE,
      studentId: DataTypes.INTEGER,
      classId: DataTypes.INTEGER,
      status: DataTypes.TINYINT(1),
    },
    {
      sequelize,
      modelName: "students_attendance",
    }
  );
  return students_attendance;
};
