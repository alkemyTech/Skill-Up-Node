const {Users} = require('../../database/models')
const {ErrorObject} = require('../../helpers/error')

module.exports = {
  userNotExist: {
    custom: {
      options: async (value, {req}) => {
        const {id} = req.params
        const exist = await Users.findByPk(id)
        if(!exist) throw new ErrorObject({message: 'User not found', statusCode: 404})
      }
    }
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
  avatarNull: {
    custom: {
      options: async (value, { req }) => {
        if (!req.body.password) {
          throw new ErrorObject("avatar is null");
        }
      },
    },
  },
  roleNull: {
    custom: {
      options: async (value, { req }) => {
        if (!req.body.password) {
          throw new ErrorObject("roleId is null");
        }
      },
    },
  },
}