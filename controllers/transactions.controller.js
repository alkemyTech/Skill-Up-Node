const createHttpError = require("http-errors");
const { Transactions } = require("../database/models");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");

module.exports = {
  postCreateTransaction: catchAsync(async (req, res, next) => {
    try {
      const response = await Transactions.create(req.body);

      endpointResponse({
        res,
        message: "Transaction created successfully.",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving Transaction] - [Transaction - POST]: ${error.message}`
      );
      next(httpError);
    }
  }),
  getFindTransaction: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await Transactions.findByPk(id);

      endpointResponse({
        res,
        message: "Transaction found successfully.",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving Transaction] - [Transaction - POST]: ${error.message}`
      );
      next(httpError);
    }
  }),
  put: catchAsync(async (req, res, next) => {
    try {
      const id = req.params.id;
      const response = await Transactions.update(req.body, {
        where: { id: `${id}` },
      });
      endpointResponse({
        res,
        message: "successfully",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving transaction] - [transaction - PUT]: ${error.message}`
      );
      next(httpError);
    }
  }),
  getAllTransactions: catchAsync(async (req, res, next) => {
    try {
      let { page=0 } = req.query

      const datos = {
        next:0,
        previous:0,
        aux:page,
        aux2:page
      }

      page = +page
      if(page>0){
        datos.previous = --datos.aux2
        page+=page
      }
      datos.next = ++datos.aux;
      const response = await Transactions.findAll({offset:+page,limit:2});
      
      const idQuery = req.query.userId;
      if (idQuery) {
        const responseId = await Transactions.findAll({
          where: { userId: `${idQuery}` },
        });
        endpointResponse({
          res,
          message: "successfully",
          body: responseId,
        });
      } else {
        response.length
          ? endpointResponse({
              res,
              message: "Transactions obtained successfully",
              body: {
                Previous:(page===0)
                  ?false
                  :`http://localhost:3000/api/transactions?page=${datos.previous}`,
                next:`http://localhost:3000/api/transactions?page=${datos.next}`,
                response
              },
            })
          : endpointResponse({
              res,
              message: "No Transactions on DB",
            });
      }
    } catch (error) {
      const httpError = createError(
        error.statusCode,
        `[Error retrieving transactions] - [Transactions - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
  deleteTransaction: catchAsync(async (req, res, next) => {
    try {
      const id = req.params.id;
      const response = await Transactions.update(
        { softDeletes: new Date() },
        {
          where: { id: `${id}` },
        }
      );
      endpointResponse({
        res,
        message: "successfully, transaction deleted",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving transaction] - [transaction - DELETE]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
