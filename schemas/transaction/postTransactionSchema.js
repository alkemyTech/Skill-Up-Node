module.exports = {
  amount: {
    errorMessage: 'Please enter amount.',
    isFloat: {
      errorMessage: 'Amount must be numeric.',
    },
    notEmpty: {
      errorMessage: 'amount is null'
    }
  },
  userId: {
    in: ["body"],
    isNumeric: {
      errorMessage: "Id must be numeric"
    },
    notEmpty: {
      errorMessage: "userId is null"
    }
  },
  date: {
    notEmpty: {
      errorMessage: "date is empty"
    },
    isDate: {
      errorMessage: "date must be a date (AAAA/MM/DD)"
    }
  },
  categoryId: {
    notEmpty: {
      errorMessage: "categoryId is null"
    },
    isNumeric: {
      errorMessage: "categoryId must be numeric"
    }
  }
};
