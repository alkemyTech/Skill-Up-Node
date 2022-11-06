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

      response.length > 1
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
};
