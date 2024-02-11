"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("scheduleclasses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      schedule: {
        type: Sequelize.TINYINT(1),
      },
      timeLearn: {
        type: Sequelize.STRING(50),
      },
      classId: {
        type: Sequelize.INTEGER,
        references: { model: "classes", key: "id" },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("scheduleclasses");
  },
};
