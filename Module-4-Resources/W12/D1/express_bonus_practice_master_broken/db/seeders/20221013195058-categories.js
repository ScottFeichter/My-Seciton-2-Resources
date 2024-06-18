'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Strategy'
      },
      {
        name: 'Economic'
      },
      {
        name: 'Adventure'
      },
      {
        name: 'Cooperative'
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
