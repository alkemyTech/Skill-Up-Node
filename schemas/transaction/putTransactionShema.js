const { Transactions , Users } = require("../../database/models");
const { ErrorObject } = require("../../helpers/error");

module.exports = {
    id: {
      in: ["params"],
      isNumeric: {
        errorMessage: 'id must be numeric.',
      },
      custom: {
        options: async (id,{ req }) => {
          const validation = await Transactions.findOne({
            where: { id: `${id}` },
          });
          if (!validation) {
            throw new ErrorObject("id the transaction don't exist", 404);
          }
        },
      },
    },
    userId: {
      in: ["body"],
      errorMessage: "User in the transaction don't exist",
      isNumeric: {
        errorMessage: 'userId must be numeric.',
      },
      custom: {
        options: async (userId, { req }) => {
          try {
            const user = await Users.findByPk(userId);
            if (!user) throw new ErrorObject('User not found.', 404);
            req.body.user = `${user.firstName} ${user.lastName}`;
          } catch (error) {
            throw error;
          }
        },
      },
    },
    categoryId: {
      in: ["body"],
      errorMessage: "Category in the transaction don't exist",
      isNumeric: {
        errorMessage: 'categoryId must be numeric.',
      },
    },
    amount: {
      in: ["body"],
      errorMessage: "amount in the transaction don't exist",
      isNumeric: {
        errorMessage: 'amount must be numeric.',
      },
    },
    date: {
      in: ["body"],
      errorMessage: "Date in the transaction don't exist",
      isDate: {
        errorMessage: 'Date must be a valid date.',
      },
    }
};
