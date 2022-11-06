const { Users } = require("../../database/models");
const { ErrorObject } = require("../../helpers/error");

module.exports = {
  emailRegistred: {
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
  firstNameNull: {
    custom: {
      options: async (value, { req }) => {
        if (!req.body.firstName) {
          throw new ErrorObject("firstName is null");
        }
      },
    },
  },
  lastNameNull: {
    custom: {
      options: async (value, { req }) => {
        if (!req.body.lastName) {
          throw new ErrorObject("lastName is null");
        }
      },
    },
  },
  emailNull: {
    custom: {
      options: async (value, { req }) => {
        if (!req.body.email) {
          throw new ErrorObject("email is null");
        }
      },
    },
  },
  passwordNull: {
    custom: {
      options: async (value, { req }) => {
        if (!req.body.password) {
          throw new ErrorObject("password is null");
        }
      },
    },
  },
};
