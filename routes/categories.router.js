const express = require("express");
const { postCreateCategory, getCategories, getCategoryById, updateCategory } = require("../controllers/categories.controller");

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
router.put("/:id", updateCategory);
router.get("/:id", getCategoryById);


module.exports = router;
