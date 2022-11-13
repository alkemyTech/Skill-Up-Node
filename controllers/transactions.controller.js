const createHttpError = require("http-errors");
const { Transactions, Users, Categories } = require("../database/models");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { encode, decode } = require("../middlewares/jwt/jwt-methods")
const {transactionPayload, transactionResponse} = require("../helpers/tokenPayloads")
const { ErrorObject } = require('../helpers/error')

module.exports = {
  postCreateTransaction: catchAsync(async (req, res, next) => {
    try {
      req.body.date = new Date();
      const {id, userId, description, amount, date, categoryId} = await Transactions.create(req.body);
      const user = await Users.findByPk(userId)
      const category = await Categories.findByPk(categoryId)

      if(amount <= 0) throw new ErrorObject('Amount must be greater than 0.', 422)
      if(!user) throw new ErrorObject('User not found.', 404);
      if(!category) throw new ErrorObject('Category not found.', 404);

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

      if (!userId) throw new ErrorObject("The transaction could not be found", 404);
      
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

      if(!response) throw new ErrorObject("id the transaction don't exist", 404); 

      const user = await Users.findByPk(req.body.userId)
      const category = await Categories.findByPk(req.body.categoryId)

      if(req.body.amount <= 0) throw new ErrorObject('Amount must be greater than 0.', 422)
      if(!user) throw new ErrorObject('User not found.', 404);
      if(!category) throw new ErrorObject('Category not found.', 404);

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
      let { page = 0 } = req.query;

      const datos = {
        next: 0,
        previous: 0,
        aux: page,
        aux2: page,
        offset: page,
        count: 0,
        paginas: 0,
      };
      page = +page;
      if (page > 0) {
        datos.previous = --datos.aux2;
        page += page;
      }
      datos.offset = datos.offset * 10;
      datos.next = ++datos.aux;
      
      const idQuery = req.query.userId;

      if (idQuery) {
        datos.count = await Transactions.count({
          where: { userId: idQuery },
        });
        datos.paginas = Math.ceil(datos.count / 10);

        const user = await Users.findByPk(idQuery);
        if (!user) throw new ErrorObject("User not found. Check the data entered", 404);

        const responseId = await Transactions.findAll({
          where: { userId: idQuery },
          offset: datos.offset,
          limit: 10,
        });

        const allTransactionsResponse = await Promise.all(
          responseId.map(async (t) => {
            const payload = transactionPayload(t.id, t.userId);
            const token = await encode(payload);
            const response = transactionResponse(
              t.description,
              t.amount,
              t.date,
              token
            );

            return response;
          })
        );

        responseId.length
          ? endpointResponse({
              res,
              message: "successfully",
              body: {
                paginas: datos.paginas,
                Previous:
                  page === 0
                    ? false
                    : `http://localhost:3000/api/transactions?page=${datos.previous}`,
                next:
                  datos.next === datos.paginas
                    ? false
                    : `http://localhost:3000/api/transactions?page=${datos.next}`,
                responseId:
                  responseId.lenght === 0
                    ? "No more transaction on DB"
                    : allTransactionsResponse,
              },
            })
          : endpointResponse({
              res,
              message: {
                msg: "No Transactions on DB",
                previous: `http://localhost:3000/api/transactions?page=${
                  datos.paginas - 1
                }`,
              },
            });
      } else {
        datos.count = await Transactions.count();
        datos.paginas = Math.ceil(datos.count / 10);

        const response = await Transactions.findAll({
          offset: datos.offset,
          limit: 10,
        });

        response.length
          ? endpointResponse({
              res,
              message: "Transactions obtained successfully",
              body: {
                paginas: datos.paginas,
                Previous:
                  page === 0
                    ? false
                    : `http://localhost:3000/api/transactions?page=${datos.previous}`,
                next:
                  datos.next === datos.paginas
                    ? false
                    : `http://localhost:3000/api/transactions?page=${datos.next}`,
                response:
                  response.lenght === 0
                    ? "No more transaction on DB"
                    : response,
              },
            })
          : endpointResponse({
              res,
              message: {
                msg: "No Transactions on DB",
                previous: `http://localhost:3000/api/transactions?page=${
                  datos.paginas - 1
                }`,
              },
            });
      }
    } catch (error) {
      console.log(error);
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving transactions] - [Transactions - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
  deleteTransaction: catchAsync(async (req, res, next) => {
    try {
      const id = req.params.id;
      
      const validation = await Transactions.findOne({
        where: { id: `${id}` },
      });
      if (!validation) {
        throw new ErrorObject("id the transaction don't exist", 404);
      }

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
