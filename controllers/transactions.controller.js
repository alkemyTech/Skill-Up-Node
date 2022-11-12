const createHttpError = require("http-errors");
const { Transactions } = require("../database/models");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { encode, decode } = require("../middlewares/jwt/jwt-methods")
const {transactionPayload, transactionResponse} = require("../helpers/tokenPayloads")

module.exports = {
  postCreateTransaction: catchAsync(async (req, res, next) => {
    try {
      req.body.date = new Date();
      const {id, userId, description, amount, date} = await Transactions.create(req.body);

      const payload = transactionPayload(id, userId)
      const token = await encode(payload)
      const response = transactionResponse(description, amount, date, token)

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
      const {userId, description, amount, date} = await Transactions.findByPk(id);
      
      const payload = transactionPayload(id, userId)
      const token = await encode(payload)
      const response = transactionResponse(description, amount, date, token)

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
      const transactions = await Transactions.findAll();

      const allTransactions = await Promise.all(transactions.map(async t => {
      
        const payload = transactionPayload(t.id, t.userId)
        const token = await encode(payload)
        const response = transactionResponse(t.description, t.amount, t.date, token)
        
        return response
      }))
      
      const idQuery = req.query.userId;
      
      if (idQuery) {
        const responseId = await Transactions.findAll({
          where: { userId: idQuery },
        });
        
        const allTransactionsResponse = await Promise.all(responseId.map(async t => {
        
          const payload = transactionPayload(t.id, t.userId)
          const token = await encode(payload)
          const response = transactionResponse(t.description, t.amount, t.date, token)
          
          return response
        }))

        endpointResponse({
          res,
          message: "successfully",
          body: allTransactionsResponse,
        });
      } else {
        allTransactions.length
          ? endpointResponse({
              res,
              message: "Transactions obtained successfully",
              body: allTransactions,
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
