const express = require("express");
const {
  put,
  postCreateTransaction,
  deleteTransaction,
  getFindTransaction,
  getAllTransactions,
} = require("../controllers/transactions.controller");
const {
  validateRequestSchema,
} = require("../middlewares/validation/validateSchema.middleware");

const router = express.Router();

const postTransactionSchema = require("../schemas/transaction/postTransaction.schema");
const getTransactionSchema = require("../schemas/transaction/getTransaction.schema");

const getValidationById = require("../schemas/transaction/getTransactionById.schema");
const putValidation = require("../schemas/transaction/putTransaction.schema");
const deleteValidation = require("../schemas/transaction/deleteTransaction.schema");

const ownershipMiddleware = require("../middlewares/auth/ownership.middleware");
const authMiddleware = require("../middlewares/auth/auth.middleware");

/**
 * @swagger
 * components:
 *     schemas:
 *       Transactions:
 *         type: object
 *         properties:
 *           description:
 *             type: string
 *           amount:
 *             type: number
 *             format: float
 *           userId:
 *             type: integer
 *           categoryId:
 *             type: integer
 *           date:
 *             type: string
 *             format: date
 *           softDeletes:
 *             type: string
 *             format: date
 *         required:
 *            - amount
 *            - userId
 *            - categoryId
 *            - date
 *
 *
 */

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Find all Transactions
 *     tags: [Transactions]
 *     description: Find all Transactions.
 *     parameters:
 *        - name: userId
 *          in: query
 *          description: Filter by userId to return.
 *          schema:
 *             type: integer
 *             format: int64
 *             example: 1
 *        - name: page
 *          in: query
 *          description: Filter by page.
 *          schema:
 *             type: integer
 *             format: int64
 *             example: 1
 *     responses:
 *       '200':
 *            description: ok - successful operation
 *            content:
 *               application/json:
 *                 schema:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transactions'
 *                   example:
 *                     status: true
 *                     code: 200
 *                     message: Transactions obtained successfully
 *                     body:
 *                       description: income
 *                       amount: 1000
 *                       date: 2022-11-10T21:45:49.000Z
 *                       token: eyJhbGciOiJIUzI1NiJ9.MQ.gaKRuIIRNvXiTlyNPE1Kp3SpAQfhrI3r9MrSB1YdMz8
 *       '400':
 *            description: Bad Request - some parameter entered does not correspond to the requirements of the endpoint.
 *   post:
 *     summary: Create Transactions
 *     tags: [Transactions]
 *     description: This can only be done by the logged in Transactions.
 *     requestBody:
 *       description: Get all Transactions
 *       content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/Transactions'
 *            example:
 *              description: income
 *              amount: 1000
 *              date: 2022-11-10
 *              userId: 1
 *              categoryId: 1
 *         application/xml:
 *            schema:
 *              $ref: '#/components/schemas/Transactions'
 *            example:
 *              description: income
 *              amount: 1000
 *              date: 2022-11-10
 *              userId: 1
 *              categoryId: 1
 *         application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/Transactions'
 *            example:
 *              description: income
 *              amount: 1000
 *              date: 2022-11-10
 *              userId: 1
 *              categoryId: 1
 *         required: true
 *     responses:
 *       '200':
 *         description: Ok -successful operation
 *         content:
 *            application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Transactions'
 *               example:
 *                 status: true
 *                 code: 200
 *                 message: Transactions obtained successfully
 *                 body:
 *                   description: income
 *                   amount: 1000
 *                   date: 2022-11-10T21:45:49.000Z
 *                   token: eyJhbGciOiJIUzI1NiJ9.MQ.gaKRuIIRNvXiTlyNPE1Kp3SpAQfhrI3r9MrSB1YdMz8
 *       '400':
 *         description: Bad Request - some parameter entered does not correspond to the requirements of the endpoint.
 *       '404':
 *         description: Resource not found - User or Category not found.
 *       '422':
 *         description: Unprocessable Entity - Amount must be greater than 0.
 *       '500':
 *         description: Internal Server Error
 */
router.get(
  "/",
  validateRequestSchema(getValidationById),
  authMiddleware,
  getAllTransactions
);
router.post(
  "/",
  validateRequestSchema(postTransactionSchema),
  authMiddleware,
  postCreateTransaction
);

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Find Transactions by Id
 *     tags: [Transactions]
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID of Transactions to return.
 *          schema:
 *             type: integer
 *             format: int64
 *             example: 1
 *     responses:
 *       '200':
 *         description: Ok - successful operation
 *         content:
 *            application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Transactions'
 *               example:
 *                 status: true
 *                 code: 200
 *                 message: Transactions obtained successfully
 *                 body:
 *                   description: income
 *                   amount: 1000
 *                   date: 2022-11-10T21:45:49.000Z
 *                   token: eyJhbGciOiJIUzI1NiJ9.MQ.gaKRuIIRNvXiTlyNPE1Kp3SpAQfhrI3r9MrSB1YdMz8
 *       '400':
 *         description: Bad Request - The specified Transactions ID is invalid (not a number).
 *       '404':
 *         description: Resource not found - A Transactions with the specified ID was not found.
 *       '500':
 *         description: Internal Server Error
 *   put:
 *     summary: Edit Transactions by Id
 *     tags: [Transactions]
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID of Transactions to edit.
 *          schema:
 *             type: integer
 *             format: int64
 *             example: 1
 *     requestBody:
 *            description: Update a Transactions by id
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Transactions'
 *                example:
 *                  description: income
 *                  amount: 1000
 *                  date: 2022-11-10
 *                  userId: 1
 *                  categoryId: 1
 *              application/xml:
 *                schema:
 *                  $ref: '#/components/schemas/Transactions'
 *                example:
 *                  description: income
 *                  amount: 1000
 *                  date: 2022-11-10
 *                  userId: 1
 *                  categoryId: 1
 *              application/x-www-form-urlencoded:
 *                schema:
 *                  $ref: '#/components/schemas/Transactions'
 *                example:
 *                  description: income
 *                  amount: 1000
 *                  date: 2022-11-10
 *                  userId: 1
 *                  categoryId: 1
 *            required: true
 *     responses:
 *       '200':
 *         description: Ok- successful operation
 *         content:
 *            application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Transactions'
 *               example:
 *                 status: true
 *                 code: 200
 *                 message: Transactions update successfully
 *                 body: [1]
 *       '400':
 *         description: Bad Request - The specified Transactions ID is invalid (not a number).
 *       '404':
 *         description: Resource not found - A Transactions with the specified ID was not found.
 *       '500':
 *         description: Internal Server Error
 *   delete:
 *     summary: Delete Transactions by Id
 *     tags: [Transactions]
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID of Transactions to delete.
 *          schema:
 *             type: integer
 *             format: int64
 *             example: 1
 *     responses:
 *       '200':
 *         description: Ok- successful operation
 *         content:
 *            application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Transactions'
 *               example:
 *                 status: true
 *                 code: 200
 *                 message: successfully, transaction deleted
 *                 body: [1]
 *
 *       '400':
 *         description: Bad Request - The specified Transactions ID is invalid (not a number).
 *       '404':
 *         description: Resource not found - A Transactions with the specified ID was not found.
 *       '500':
 *         description: Internal Server Error
 *
 */
router.get(
  "/:id",
  validateRequestSchema(getTransactionSchema),
  authMiddleware,
  getFindTransaction
);
router.put(
  "/:id",
  validateRequestSchema(putValidation),
  authMiddleware,
  ownershipMiddleware,
  put
);
router.delete(
  "/:id",
  validateRequestSchema(deleteValidation),
  authMiddleware,
  ownershipMiddleware,
  deleteTransaction
);

module.exports = router;
