"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comments.belongsTo(models.classes, {
        foreignKey: "classId",
      });
      comments.belongsTo(models.User, {
        foreignKey: "studentId",
      });
    }
  }
  comments.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      classId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      parentId: DataTypes.INTEGER,
      studentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "comments",
      tableName: "comments",
    }
  );
  return comments;
};
