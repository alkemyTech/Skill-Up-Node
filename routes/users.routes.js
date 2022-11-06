const express = require("express");
const { createUsers } = require("../controllers/user.controllers");
const createUserSchema = require("../schemas/user/createUserSchema");
const {
  validateRequestSchema,
} = require("../middlewares/validation/validate-schema.middleware");
const router = express.Router();

router.post("/", validateRequestSchema(createUserSchema), createUsers);

module.exports = router;
