const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { Categories } = require('../database/models')

module.exports = {
  postCreateCategory: catchAsync(async (req, res, next) => {
    try {
      const response = await Categories.create(req.body)
      endpointResponse({
        res,
        message: 'Category created successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving category] - [Category - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
