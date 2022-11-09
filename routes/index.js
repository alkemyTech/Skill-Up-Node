const express = require('express')
const transactionRoutes = require('./transactions.router');
const usersRoutes = require('./users.router')
const categoriesRoutes = require('./categories.router');
const authRouter = require("./auth.router")

const router = express.Router()

// example of a route with index controller get function
router.use('/transactions', transactionRoutes);
router.use("/auth", authRouter);
router.use('/users', usersRoutes)
router.use('/categories', categoriesRoutes);

module.exports = router
