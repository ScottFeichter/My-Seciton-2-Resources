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
    await queryInterface.bulkInsert('Boardgames', [
      { name: 'Gloomhaven', maxPlayers: 4, categoryId: 3 },
      { name: 'Pandemic Legacy: Season 1', maxPlayers: 4, categoryId: 4 },
      { name: 'Brass: Birmingham', maxPlayers: 4, categoryId: 2 },
      { name: 'Terraforming Mars', maxPlayers: 5, categoryId: 2 },
      { name: 'Twilight Imperium: Fourth Edition', maxPlayers: 6, categoryId: 1 },
      { name: 'Spirit Island', maxPlayers: 4, categoryId: 4 },
      { name: 'Mage Knight', maxPlayers: 4, categoryId: 3 },
      { name: 'Rising Sun', maxPlayers: 5, categoryId: 1 }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Boardgames', null, {});
  }
};
