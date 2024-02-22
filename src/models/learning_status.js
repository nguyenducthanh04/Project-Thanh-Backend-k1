"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class learning_status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      learning_status.hasOne(models.students_classes, {
        foreignKey: "statusId",
      });
      learning_status.hasMany(models.students_attendance);
      // learning_status.hasMany(models.student_status, {
      //   foreignKey: "learningStatusId",
      // });
    }
  }
  learning_status.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "learning_status",
    }
  );
  return learning_status;
};
