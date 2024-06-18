'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      { username: 'Alec', email: 'alec@alec.com', password: 'password123', faveCategoryId: 1 },
      { username: 'Dan', email: 'dan@theman.com', password: 'password!', faveCategoryId: 5 },
      { username: 'Olivia', email: 'liv@andletliv.com', password: 'password098', faveCategoryId: 3 },
      { username: 'Nate', email: 'nate@thegreat.com', password: 'password!@#', faveCategoryId: 2 }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
