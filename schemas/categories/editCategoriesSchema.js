module.exports = {
    editCategorySchema: {
      name: {
        optional: true,
        errorMessage: "name is required",
      },
      id: {
        in: ["params"],
        isNumeric: {
          errorMessage: 'Id must be numeric.',
        },
      }
    },
  };
  