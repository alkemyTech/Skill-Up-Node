'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Transactions",
    [
      {
        description: "Receive money",
        amount: 200.0,
        userId: 1,
        categoryId: 2,
        date: new Date(),
        softDeletes: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Transfer money",
        amount: 500.0,
        userId: 1,
        categoryId: 1,
        date: new Date(),
        softDeletes: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Pay invoices",
        amount: 100.0,
        userId: 1,
        categoryId: 1,
        date: new Date(),
        softDeletes: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );

},

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete("Transactions", null, {});
     
  }
};
