const createHttpError = require("http-errors")
const { endpointResponse } = require("../helpers/success")
const { catchAsync } = require("../helpers/catchAsync")
const { Categories, Transactions } = require("../database/models/")
const { ErrorObject } = require("../helpers/error");

module.exports = {
  postCreateCategory: catchAsync(async (req, res, next) => {
    try {
      const response = await Categories.create(req.body)
      endpointResponse({
        res,
        message: "Categories created successfully",
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating category] - [Categories - POST]: ${error.message}`
      )
      next(httpError)
    }
  }),

  getCategories: catchAsync(async (req, res, next) => {
    try {
      const response = await Categories.findAll()
      endpointResponse({
        res,
        message: "Found all categories successfully",
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error  getting categories] - [index - GET]: ${error.message}`
      )
      next(httpError)
    }
  }),

  updateCategory: catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { name, description } = req.body

    const foundCategory = await Categories.findByPk(id)

    if(!foundCategory) throw new ErrorObject('Category not found', 404)

    try {
      const response = await foundCategory.update({ name, description })

      endpointResponse({
        res,
        message: "Categories update successfully",
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating Categories] - [index - POST]: ${error.message}`
      )
      next(httpError)
    }
  }),

  getCategoryById: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    try {
      const response = await Categories.findByPk(id)

      if (!response) throw new ErrorObject("the id does not exist in the database", 404);

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


  deleteCategory: catchAsync(async (req, res, next) => {
    const { id } = req.params

    const foundCategory = await Categories.findByPk(id)

    if (!foundCategory) throw new ErrorObject("the category id does not exist in the database", 404);

    try {
      await Transactions.update({
        categoryId: null
      },
      {
        where: { categoryId: id }
      })
  
      const response = await foundCategory.destroy({ id })

      endpointResponse({
        res,
        message: "Categories deleted successfully",
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting Categories] - [index - DELETE]: ${error.message}`
      )
      next(httpError)
    }
  }),

}
