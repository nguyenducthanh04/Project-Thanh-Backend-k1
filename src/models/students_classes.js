"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class students_classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      students_classes.belongsTo(models.User, {
        foreignKey: "studentId",
      });
      students_classes.belongsTo(models.classes, {
        foreignKey: "classId",
      });
      students_classes.belongsTo(models.learning_status, {
        foreignKey: "statusId",
      });
    }
  }
  students_classes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      studentId: DataTypes.INTEGER,
      classId: DataTypes.INTEGER,
      statusId: DataTypes.INTEGER,
      completedDate: DataTypes.DATE,
      dropDate: DataTypes.DATE,
      recover: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "students_classes",
    }
  );
  return students_classes;
};
