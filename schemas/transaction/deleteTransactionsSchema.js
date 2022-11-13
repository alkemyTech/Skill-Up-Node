const { Transactions } = require("../../database/models");
const { ErrorObject } = require("../../helpers/error");

module.exports = {
    id: {
      in: ["params"],
      errorMessage: "ID is wrong",
      isNumeric: {
        errorMessage: 'Id must be numeric.',
      },
      custom: {
        options: async (id, { req }) => {
          const validation = await Transactions.findOne({
            where: { id: `${id}` },
          });
          if (!validation) {
            throw new ErrorObject("id the transaction don't exist", 404);
          }
        },
      },
    }
};
