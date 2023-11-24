"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      roles.belongsToMany(models.User, {
        through: "user_role",
        foreignKey: "roleId",
      });
      roles.belongsToMany(models.permissions, {
        through: "role_permission",
        foreignKey: "roleId",
      });
    }
  }
  roles.init(
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
      modelName: "roles",
    }
  );
  return roles;
};
