const { Users } = require("../../database/models");
const { ErrorObject } = require("../../helpers/error");

module.exports = {
  email: {
    isEmail: {
      errorMessage: "please enter a correct email"
    },
    notEmpty: {
      errorMessage: "email is null"
    },
    custom: {
      options: async (value, { req }) => {
        const { email } = req.body;
        const exist = await Users.findOne({
          where: {
            email,
          },
        });
        if (exist) {
          throw new ErrorObject("Email is registred in the database");
        }
      },
    },
  },
  firstName: {
    notEmpty: {
      errorMessage:"firstName is null"
    }
  },
  lastName: {
    notEmpty:{
      errorMessage:"lastName is null"
    }
  },
  password: {
    notEmpty:{
      errorMessage:"password is null"
    }
  },
};
