module.exports = {
  deleteCategorySchema: {
    id: {
      in: ["params"],
      isInt: true,
      errorMessage: "Id must be numeric.",
    },
  },
};
