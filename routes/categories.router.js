const express = require("express");
const { postCreateCategory, getCategories } = require("../controllers/categories.controller");
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

router.get("/", getCategories);

module.exports = router;
