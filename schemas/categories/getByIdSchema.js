module.exports = {
  findByIdSchema: {
    id: {
      in: ["params"],
      isNumeric: {
        errorMessage: 'Id must be numeric.',
      },
    }
  },
};