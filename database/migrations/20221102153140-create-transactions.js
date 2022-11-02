'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING,
        allowNull:true
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull:false
      },
      userid: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      categorityid: {
        type: Sequelize.INTEGER,
        references:{
          model:'Categories',
          key:'id'
        },
        // onDelete:'CASCADA',
        // onUpdate:'CASCADA'
      },
      date: {
        type: Sequelize.DATE,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  }
};