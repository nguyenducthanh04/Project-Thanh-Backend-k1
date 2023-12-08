



"use strict";
const hash = require("../../utils/hash");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];
    const password = hash.make("123456");
    data.push({
      name: "Nguyễn Đức Thanh",
      email: "dducthanh04@gmail.com",
      phone: "0928566686",
      address: "Hưng Yên",
      typeId: 1,
      firstLogin: 1,
      password: password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
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
