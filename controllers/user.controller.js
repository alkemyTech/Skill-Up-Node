const createError = require("http-errors");
const bcrypt = require("bcrypt");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { Users } = require("../database/models");
const { encode, decode } = require("../middlewares/jwt/jwt-methods")
const {userPayload, userResponse} = require("../helpers/tokenPayloads")

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

      const payload = userPayload(password, user.id, roleId, email)
      const token = await encode(payload)
      const response = userResponse(firstName, lastName, email, token)

      endpointResponse({ res, message: "Users was created", body: response });
    } catch (error) {
      const httpError = createError(error.statusCode, error.message);
      next(httpError);
    }
  }),

  getAllUsers: catchAsync(async (req, res, next) => {
    try {
      let { page = 0 } = req.query;

      const datos = {
        next: 0,
        previous: 0,
        aux: page,
        aux2: page,
        offset: page,
        count: 0,
        pages: 0,
      };

      page = +page;
      if (page > 0) {
        datos.previous = --datos.aux2;
        page += page;
      }
      datos.offset = datos.offset * 10;
      datos.next = ++datos.aux;

      datos.count = await Users.count();
      datos.pages = Math.ceil(datos.count / 10);

      const response = await Users.findAll({
        offset: datos.offset,
        limit: 10,
        attributes: ["firstName", "lastName", "email", "createdAt"],
      });

      response.length
        ? endpointResponse({
            res,
            message: "Users obtained successfully",
            body: {
              pages: datos.pages,
              Previous:
                page === 0
                  ? false
                  : `http://localhost:3000/api/users?page=${datos.previous}`,
              next:
                datos.next === datos.pages
                  ? false
                  : `http://localhost:3000/api/users?page=${datos.next}`,
              response: response.length === 0 ? `No more user on DB` : response,
            },
          })
        : endpointResponse({
            res,
            status: 400,
            message: {
              msg: "No Transactions on DB",
              previous: `http://localhost:3000/api/transactions?page=${
                datos.pages - 1
              }`,
            },
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
      const user = await Users.update(
        { softDeletes: new Date() },
        {
          where: { id },
        }
      );
      endpointResponse({
        res,
        message: "successfully deleted user",
        body: user,
      });
    } catch (error) {
      const httpError = createError(error.statusCode, error.message);
      next(httpError);
    }
  }),

  editUser: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      if (req.body.password) {
        const { firstName, lastName, email, password, avatar, roleId } =
          req.body;
        await Users.update(
          {
            firstName,
            lastName,
            email,
            password: await encryptPassword(password),
            avatar,
            roleId,
          },
          {
            where: { id },
          }
        );
      } else {
        const response = req.body;
        await Users.update(response, {
          where: { id },
        });
      }
      endpointResponse({ res, message: "User was edited" });
    } catch (error) {

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
      });
    } catch (error) {
      const httpError = createError(
        error.statusCode,
        `[Error retrieving user by ID] - [user - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
