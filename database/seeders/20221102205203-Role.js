"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     */

    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          name: "Admin",
          description: "A user with special privileges",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "User",
          description: "App user",
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
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
