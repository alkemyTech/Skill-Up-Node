const express = require('express');
const { postCreateTransaction } = require('../controllers/transactions.controller');
const postTransactionSchema = require('../schemas/transaction/postTransactionSchema');
const {
    validateRequestSchema,
  } = require('../middlewares/validation/validate-schema.middleware');
const router = express.Router();

router.post('/', validateRequestSchema(postTransactionSchema), postCreateTransaction);

module.exports = router;
