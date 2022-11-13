module.exports = {
    id: {
      in: ["params"],
      notEmpty: {
        errorMessage: "id is null"
      },
      isNumeric: {
        errorMessage: "id must be numeric"
      }
    },
}