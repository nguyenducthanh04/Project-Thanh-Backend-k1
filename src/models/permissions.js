"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      permissions.belongsToMany(models.roles, {
        through: "role_permission",
        foreignKey: "permissionId",
      });
      permissions.belongsToMany(models.User, {
        through: "user_permission",
        foreignKey: "permissionId",
      });
    }
  }
  permissions.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "permissions",
      tableName: "permissions",
    }
  );
  return permissions;
};
