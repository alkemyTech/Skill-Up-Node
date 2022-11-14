module.exports = {
  createCategorySchema: {
    name: {
      optional: false,
      notEmpty: true,
      errorMessage: "name is required",
    }
  },
};
