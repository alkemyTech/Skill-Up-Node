module.exports = {
    editCategorySchema: {
      name: {
        optional: true,
        errorMessage: "name is required",
      },
      id: {
        in: ["params"],
        isInt: true, 
        errorMessage: 'Id must be numeric.',
        
      }
    },
  };
  