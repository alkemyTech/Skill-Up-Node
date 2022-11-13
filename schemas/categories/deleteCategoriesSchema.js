module.exports = {
  deleteCategorySchema: {
    id: {
      in: ["params"],
      isNumeric: {
        errorMessage: 'Id must be numeric.',
      },
    }
  },
};