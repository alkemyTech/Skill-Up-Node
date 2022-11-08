const { ErrorObject } = require("../../helpers/error");
const { Transactions } = require("../../database/models");

const idSchema = {
  id: {
    in: ["params"],
    isInt: true,
    toInt: true,
    errorMessage: "ID is wrong",
  },
  transactionId: {
    custom: {
      options: async (transactionId, { req }) => {
        try {
          const { id } = req.params;
          const response = await Transactions.findByPk(id);
          if (!response) {
            throw new ErrorObject("The transaction could not be found", 404);
          }
        } catch (error) {
          throw error;
        }
      },
    },
  },
};

module.exports = idSchema;
