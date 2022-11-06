const express = require("express");
const { createUsers, deleteUser } = require("../controllers/user.controllers");
const createUserSchema = require("../schemas/user/createUserSchema");
const deleteUserSchema = require("../schemas/user/deleteUserSchema")
const {
  validateRequestSchema,
} = require("../middlewares/validation/validate-schema.middleware");
const router = express.Router();

router.post("/", validateRequestSchema(createUserSchema), createUsers);

router.delete("/:id", validateRequestSchema(deleteUserSchema), deleteUser)
module.exports = router;
