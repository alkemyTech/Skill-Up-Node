const express = require('express')
const { get } = require('../controllers/index')
const transactionRoutes = require('./transactions.router');
const usersRoutes = require('./users.router')
const categoriesRoutes = require('./categories.router');

const router = express.Router()

// example of a route with index controller get function
router.use('/transactions', transactionRoutes);
router.use('/users', usersRoutes)
router.use('/categories', categoriesRoutes);

module.exports = router
