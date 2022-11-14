module.exports = {
    id: {
      in: ["params"],
      notEmpty: {
        errorMessage: "id is null"
      },
      isInt: true, 
      errorMessage: "id must be numeric"
      
    },
}