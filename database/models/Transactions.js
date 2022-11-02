'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transactions.belongsTo(models.Categories,{
        foreignKey:'id',
        targetKey:'categorityid'
      })
    }
  };
  Transactions.init({
    description: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    userid: DataTypes.INTEGER,
    categorityid: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};