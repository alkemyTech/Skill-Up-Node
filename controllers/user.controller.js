const createError = require("http-errors");
const bcrypt = require("bcrypt");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { Users } = require("../database/models");

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

module.exports = {
  createUsers: catchAsync(async (req, res, next) => {
    try {
      const { firstName, lastName, email, password, roleId, avatar } = req.body;

      const user = await Users.create({
        firstName,
        lastName,
        email,
        password: await encryptPassword(password),
        roleId,
        avatar,
      });

      endpointResponse({ res, message: "Users was created", body: user });
    } catch (error) {
      const httpError = createError(error.statusCode, error.message);
      next(httpError);
    }
  }),

  getAllUsers: catchAsync(async (req, res, next) => {
    try {
      const response = await Users.findAll({
        attributes: ["firstName", "lastName", "email", "createdAt"],
      });

      response
        ? endpointResponse({
            res,
            message: "Users obtained successfully",
            body: response,
          })
        : endpointResponse({
            res,
            status: 400,
            message: "No Users on DB",
          });
    } catch (error) {
      const httpError = createError(
        error.statusCode,
        `[Error retrieving users] - [users - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),

  deleteUser: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await Users.update({softDeletes:new Date()},{
        where:{id}
      })
      endpointResponse({ res, message: "successfully deleted user", body: user });
    } catch (error) {
      const httpError = createError(error.statusCode, error.message);
      next(httpError);
    }
  }),

  editUser: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params
      

      if (req.body.password) {
        const { firstName, lastName, email, password, avatar, roleId } = req.body;
        await Users.update({
          firstName,
          lastName,
          email,
          password: await encryptPassword(password),
          avatar,
          roleId
        },
        {
          where: {id}
        }) 
      }else{
        const response = req.body;
        await Users.update(response,
        {
          where: {id}
        })
      }
      
      
      endpointResponse({res, message: "User was edited"})
    }catch(error){
      const httpError = createError(error.statusCode, error.message);
      next(httpError);
    }
  }),
  getUserById: catchAsync(async (req, res, next) => {
    const id = req.params.id;

    try {
      const response = await Users.findByPk(id, {
        attributes: ["firstName", "lastName", "email", "createdAt"],
      });
      endpointResponse({
            res,
            message: "User obtained successfully",
            body: response,
          })
    } catch (error) {
      const httpError = createError(
        error.statusCode,
        `[Error retrieving user by ID] - [user - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
