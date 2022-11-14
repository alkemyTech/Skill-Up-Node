const idSchema = {
  id: {
    in: ["params"],
    isInt: true,
    toInt: true,
    errorMessage: "ID is wrong",
  }
};

module.exports = idSchema;
