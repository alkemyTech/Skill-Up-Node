const express = require("express");
const { validation } = require("../middlewares/validation");
const { loginSchema } = require("../schemas/loginSchema");
const { login } = require("../controllers/authController");


const router = express.Router();

router.post("/login", validation(loginSchema), login);


module.exports = router;