"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("exercises_submits", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      studentId: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
        onDelete: 'CASCADE',
      },
      exerciseId: {
        type: Sequelize.INTEGER,
        references: { model: "exercises", key: "id" },
        onDelete: 'CASCADE',
      },
      content: {
        type: Sequelize.TEXT,
      },
      attachment: {
        type: Sequelize.STRING(200),
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
    await queryInterface.dropTable("exercises_submits");
  },
};
