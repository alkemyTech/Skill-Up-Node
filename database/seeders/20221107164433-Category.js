'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: 'Income',
          description: 'An amount of money a user receives into the account',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Outcome',
          description: 'An amount of money a user needs to do or buy something',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
