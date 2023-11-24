"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class course_modules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      course_modules.belongsTo(models.courses, {
        foreignKey: "courseId",
      });
      course_modules.hasMany(models.module_document, {
        foreignKey: "moduleId",
      });
    }
  }
  course_modules.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      courseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "course_modules",
    }
  );
  return course_modules;
};
