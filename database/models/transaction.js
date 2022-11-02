"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.User, { foreignKey: "userId" });
      Transaction.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  transaction.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
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
      modelName: "transaction",
    }
  );
  return transaction;
};
