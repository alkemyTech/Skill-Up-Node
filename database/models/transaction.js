"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transactions.belongsTo(models.Users, { foreignKey: "userId" });
      Transactions.belongsTo(models.Categories, { foreignKey: "categoryId" });
    }
  }
  Transactions.init(
    {
      description: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      amount: {
        allowNull: false,
        type: DataTypes.DECIMAL,
      },
      date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      softDeletes: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transactions",
    }
  );
  return Transactions;
};
