"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class module_document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      module_document.belongsTo(models.course_modules, {
        foreignKey: "moduleId",
      });
    }
  }
  module_document.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pathName: DataTypes.STRING,
      moduleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "module_document",
    }
  );
  return module_document;
};
