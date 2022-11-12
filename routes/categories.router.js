const express = require("express");
const { postCreateCategory, 
        getCategories, 
        getCategoryById, 
        updateCategory,
        deleteCategory } = require("../controllers/categories.controller");

const { validateRequestSchema,
       } = require("../middlewares/validation/validate-schema.middleware");
const { createCategorySchema } = require("../schemas/categories/create.schema");

const router = express.Router();

/** 
 * @swagger
 * components:
 *     schemas:
 *       Categories:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *           description:
 *             type: string
 *         required:
 *            - name
 *            
 * 
 */

router.post("/",
  validateRequestSchema(createCategorySchema),
  postCreateCategory
);

router.get("/", getCategories);
router.put("/:id", updateCategory);
router.get("/:id", getCategoryById);
router.delete("/:id", deleteCategory);


module.exports = router;