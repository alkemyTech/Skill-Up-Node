const express = require('express');
const { postCreateTransaction, getAllTransactions } = require('../controllers/transactions.controller');
const postTransactionSchema = require('../schemas/transaction/postTransactionSchema');
const {
    validateRequestSchema,
  } = require('../middlewares/validation/validate-schema.middleware');
const getValidationById = require('../schemas/transaction/getTransactionsSchemaById');
const { put } = require('../controllers/transactions.controller')
const putValidation  = require('../schemas/transaction/putTransactionShema');

const router = express.Router();

router.get("/",validateRequestSchema(getValidationById),getAllTransactions);
router.put('/:id', validateRequestSchema(putValidation), put);
router.post('/', validateRequestSchema(postTransactionSchema), postCreateTransaction);

module.exports = router
