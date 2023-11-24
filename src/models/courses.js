"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      courses.belongsTo(models.User, {
        foreignKey: "teacherId",
      });
      courses.hasMany(models.course_modules, {
        foreignKey: "courseId",
      });
      courses.hasMany(models.classes, {
        foreignKey: "courseId",
      });
    }
  }
  courses.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      teacherId: DataTypes.INTEGER,
      tryLearn: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
      quantity: DataTypes.INTEGER,
      duration: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "courses",
    }
  );
  return courses;
};
