const { ErrorObject } = require("../../helpers/error");
const { Users } = require("../../database/models");

module.exports = {
  userId: {
    isNumeric: {
      errorMessage: 'userId must be numeric.',
    },
    custom: {
      options: async (userId, { req }) => {
        try {
          if (req.query.userId) {
            const user = await Users.findByPk(userId);
            if (!user) throw new ErrorObject("User not found. Check the data entered", 404);
          }
          // pendiente validación de sesion
          // const User = req.session;
          // if (!(userId === User.id || User.rol === "admin")) {
          //     throw new ErrorObject(`[Error retrieving Transactions] - [Transactions - GET]: user ${User} not authorized to access the information.`, 401);
          // }
        } catch (error) {
          throw error;
        }
      },
    },
  },
};
