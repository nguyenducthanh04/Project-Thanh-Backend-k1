"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class teacher_calendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      teacher_calendar.belongsTo(models.User, {
        foreignKey: "teacherId",
      });
      teacher_calendar.belongsTo(models.classes, {
        foreignKey: "classId",
      });
    }
  }
  teacher_calendar.init(
    {
      teacherId: DataTypes.INTEGER,
      classId: DataTypes.INTEGER,
      scheduleDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "teacher_calendar",
      tableName: "teacher_calendars",
    }
  );
  return teacher_calendar;
};
