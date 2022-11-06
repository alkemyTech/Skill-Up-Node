const express = require('express')
const { get } = require('../controllers/index')
const transactionRoutes = require('./transactions.routes');
const usersRoutes = require('./users.routes')

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)
router.use('/transactions', transactionRoutes);
router.use('/users', usersRoutes)

module.exports = router
