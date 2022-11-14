module.exports = {
  findByIdSchema: {
    id: {
      in: ["params"],
      isInt: true,
      errorMessage: 'Id must be numeric.',
      
    }
  },
};