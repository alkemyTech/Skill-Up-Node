const createHttpError = require('http-errors');
const { Transaction } = require('../database/models');
const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');

// example of a controller. First call the service, then build the controller method
module.exports = {
  postCreateTransaction: catchAsync(async (req, res, next) => {
    try {
      const { description, amount, date, userId, categoryId, user, category } =
        req.body;

      await Transaction.create({
        description,
        amount,
        date,
        userId,
        categoryId,
      });

      const body = {
        description,
        amount,
        date,
        user,
        category,
      };

      endpointResponse({
        res,
        message: 'Transaction created successfully.',
        body,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving Transaction] - [Transaction - POST]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
