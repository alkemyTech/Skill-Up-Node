const createHttpError = require('http-errors')
const { Users } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { Security } = require('../config/security')
const {encode, decode} = require("../middlewares/jwt/jwt-methods")

module.exports = {
    login: catchAsync(async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({
                where: { email }
            });

            if (!user) {
                endpointResponse({
                    res,
                    code: 404,
                    message: 'User does not exist',
                    body: { ok: false },
                });
            }

            if (!await Security.compare(password, user.password)) {
                endpointResponse({
                    res,
                    code: 403,
                    message: 'Invalid password',
                    body: { ok: false },
                });
            }

            const token = await encode(user)
            const response = {
                email: user.email,
                token
            }

            endpointResponse({
                res,
                message: 'User login successfully',
                body: response,
            });
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error login authentication] - [auth/login - POST]: ${error.message}`,
            )
            next(httpError)
        }
    }),
}