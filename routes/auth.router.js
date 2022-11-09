const express = require("express");
const { validateRequestSchema } = require("../middlewares/validation/validate-schema.middleware");
const loginSchema = require("../schemas/loginSchema");
const { login } = require("../controllers/authController");


const router = express.Router();

router.post("/login", validateRequestSchema(loginSchema), login);


module.exports = router;