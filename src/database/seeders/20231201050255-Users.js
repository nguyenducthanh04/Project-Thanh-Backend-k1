



"use strict";
const hash = require("../../utils/hash");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];
    // for (let index = 0; index < 20; index++) {
      const password = hash.make("123456");
      data.push({
        name: `Trần Ngọc Anh`,
        email: `tna@gmail.com`,
        password: password,
        phone: '0585762666',
        address: 'Hà Nội',
        typeId: 3,
        // firstLogin: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    // }
    return queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  },
};
