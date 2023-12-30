"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];
    for (let index = 0; index < 50; index++) {
      // bcrypt.hash(password, saltRounds, async function (err, hash) {
      //   // Store hash in your password DB.
      data.push({
        name: `Course ${index + 1}`,
        price: 15000000,
        teacherId: 14,
        quantity: 30,
        duration: 45,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("courses", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
