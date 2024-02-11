"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [];
    for (let index = 0; index < 50; index++) {
      // const password = hash.make("123456");
      // bcrypt.hash(password, saltRounds, async function (err, hash) {
      //   // Store hash in your password DB.
      data.push({
        name: `BackEnd Nodejs`,
        quantity: 30,
        startDate: new Date(),
        endDate: new Date(),
        schedule: 40,
        courseId: 3,
        timeLearn: "100 buổi",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      // });
    }
    await queryInterface.bulkInsert("classes", data, {});
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
