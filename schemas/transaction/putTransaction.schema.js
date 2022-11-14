module.exports = {
    id: {
      in: ["params"],
      isNumeric: {
        errorMessage: 'id must be numeric.',
      },
    },
    userId: {
      in: ["body"],
      errorMessage: "User in the transaction don't exist",
      isNumeric: {
        errorMessage: 'userId must be numeric.',
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
      isFloat: {
        errorMessage: 'amount must be numeric.',
      },
    },
    date: {
      in: ["body"],
      errorMessage: "Date in the transaction don't exist",
      isDate: {
        errorMessage: 'Date must be a valid date. (AAAA/MM/DD)',
      },
    }
};
