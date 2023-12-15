'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [];
    for(let index = 0; index < 12; index++) {
      data.push({
        name: `User${index + 1}`,
        price: 15000000,
        teacherId:  `14+${index + 1}`,
        quantity: 20,
        duration: 40,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("courses", data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
