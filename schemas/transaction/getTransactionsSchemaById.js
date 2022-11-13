module.exports = {
  userId: {
    in: ["query"],
    isNumeric: {
      errorMessage: "Id must be numeric"
    }
  },
  // pendiente validación de sesion
  // const User = req.session;
  // if (!(userId === User.id || User.rol === "admin")) {
  //     throw new ErrorObject(`[Error retrieving Transactions] - [Transactions - GET]: user ${User} not authorized to access the information.`, 401);
  // }
};
