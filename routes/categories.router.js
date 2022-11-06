const express = require("express");
const { postCreateCategory } = require("../controllers/categories.controller");
const {
  validateRequestSchema,
} = require("../middlewares/validation/validate-schema.middleware");
const { createCategorySchema } = require("../schemas/categories/create.schema");

const router = express.Router();

router.post(
  "/",
  validateRequestSchema(createCategorySchema),
  postCreateCategory
);

module.exports = router;
