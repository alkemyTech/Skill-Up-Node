const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { Categories } = require('../database/models/')

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
      next(httpError);
    }
  }),

  
  getCategories: catchAsync(async (req, res, next) => {
      try {
        const response = await Categories.findAll()
        endpointResponse({
          res,
          message: 'Test retrieved successfully',
          body: response,
        })
      } catch (error) {
        const httpError = createHttpError(
          error.statusCode,
          `[Error retrieving index] - [index - GET]: ${error.message}`,
        )
        next(httpError)
      }
    }),
  
    getCategoryById: catchAsync(async (req, res, next) => {
      const { id } = req.params;
      try {
        const response = await Categories.findByPk(id)
  
        if (!response) {
          const httpError = createHttpError(
            401,
            `[Error retrieving Category] - [index - GET]: Couldn't find a category`, 
          )
          return next(httpError)
        }
  
        endpointResponse({
          res,
          message: 'Category retrieved successfully',
          body: response,
        })
      } catch (error) {
        const httpError = createHttpError(
          error.statusCode,
          `[Error retrieving Category] - [index - GET]: ${error.message}`,
        )
        next(httpError)
      }
    }),
}


