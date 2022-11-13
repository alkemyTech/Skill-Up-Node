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
 * /
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      requires:
 *        -name
 *        -description
 *      properties:
 *        description:
 *          type: string
 *          description: This is the description of the category
 *        name:
 *          type: string
 *          description: This is the name of the category      
 * 
 */

/**
 /
* @swagger
* /categories:
*  post:
*    summary: create a new category
*    tags: [Categories] 
*    description: Add a new category
*    requestBody:
*            description: Create a new category 
*            content:
*              application/json:
*                schema:
*                  $ref: '#/components/schemas/Category'
*                example:
*                  description: swagger description category
*                  name: swagger name category
*              application/xml:
*                schema:
*                  $ref: '#/components/schemas/Category'
*                example:
*                  description: swagger description category
*                  name: swagger name category
*              application/x-www-form-urlencoded:
*                schema:
*                  $ref: '#/components/schemas/Category'
*                example:
*                  description: swagger description category
*                  name: swagger name category
*            required: true
*    responses:
*        '200':
*          description: successfuly operation
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Category' 
*              example:
*                status: true
*                code: 200
*                message: Category created successfully
*                body:
*                  id: 1
*                  description: string
*                  name: string
*                  updatedAt: 2022-11-10T21:45:49.000Z
*                  createdAt: 2022-11-10T21:45:49.000Z       
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/Category'
*              example:
*                status: true
*                code: 200
*                message: Category created successfully
*                body:
*                  id: 1
*                  description: string
*                  name: string
*                  updatedAt: 2022-11-10T21:45:49.000Z
*                  createdAt: 2022-11-10T21:45:49.000Z 
*        '400':
*          description: Invalid ID user or ID category
*        '404':
*          description: not Found ID user or ID category
*        '500':
*          description: error of server
*/

router.post("/",
  validateRequestSchema(createCategorySchema),
  postCreateCategory
);

/**
 /
* @swagger
* /categories:
*  get:
*    summary: returns the list of all categories
*    tags: [Categories]
*    responses:
*        '200':
*          description: the list of categories
*          content:
*            application/json:
*              schema:
*                type: array
*                items:
*                  $ref: '#/components/schemas/Category'
*              example:
*                status: true
*                code: 200
*                message: Category retrevied successfully
*                body:
*                  id: 1
*                  description: string
*                  name: string
*                  updatedAt: 2022-11-10T21:45:49.000Z
*                  createdAt: 2022-11-10T21:45:49.000Z    
*        '400':
*            description: Bad Request - some parameter entered does not correspond to the requirements of the endpoint.
*/

router.get("/", getCategories);

/**
 /
* @swagger
* /categories/{id}:
*  get:
*    summary: Find category by ID
*    tags: [Categories]
*    parameters:
*       - name: id
*         in: path
*         description: ID of category to return
*         example: 1
*         required: true
*         schema:
*           type: integer
*           format: int64
*    responses:
*        '200':
*          description: successfuly operation
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Category'
*              example:
*                status: true
*                code: 200
*                message: Category retrevied successfully
*                body:
*                  id: 1
*                  description: string
*                  name: string
*                  updatedAt: 2022-11-10T21:45:49.000Z
*                  createdAt: 2022-11-10T21:45:49.000Z          
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/Category'
*              example:
*                status: true
*                code: 200
*                message: Category retrevied successfully
*                body:
*                  id: 1
*                  description: string
*                  name: string
*                  updatedAt: 2022-11-10T21:45:49.000Z
*                  createdAt: 2022-11-10T21:45:49.000Z   
*        '400':
*          description: Invalid ID supplied
*        '404':
*          description: category not found
*        '500':
*          description: error of server
*/

router.get("/:id", getCategoryById);

 /**
 /
* @swagger
* /categories/{id}:
*  put:
*    summary:  Update an existing category
*    tags: [Categories] 
*    description: Update an existing category by Id
*    parameters:
*       - name: id
*         in: path
*         description: ID of category to return
*         example: 1
*         required: true
*         schema:
*           type: integer
*           format: int64
*    requestBody:
*            description: Update a category 
*            content:
*              application/json:
*                schema:
*                  $ref: '#/components/schemas/Category'
*                example:
*                  description: swagger description category
*                  name: swagger name category
*              application/xml:
*                schema:
*                  $ref: '#/components/schemas/Category'
*                example:
*                  description: swagger description category
*                  name: swagger name category
*              application/x-www-form-urlencoded:
*                schema:
*                  $ref: '#/components/schemas/Category'
*                example:
*                  description: swagger description category
*                  name: swagger name category
*            required: true
*    responses:
*        '200':
*          description: successfuly operation
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Category'
*              example:
*                status: true
*                code: 200
*                message: Category updated successfully
*                body:
*                  id: 1
*                  description: string
*                  name: string
*                  updatedAt: 2022-11-10T21:45:49.000Z
*                  createdAt: 2022-11-10T21:45:49.000Z        
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/Category'
*              example:
*                status: true
*                code: 200
*                message: Category updated successfully
*                body:
*                  id: 1
*                  description: string
*                  name: string
*                  updatedAt: 2022-11-10T21:45:49.000Z
*                  createdAt: 2022-11-10T21:45:49.000Z
*        '400':
*          description: Invalid ID supplied
*        '404':
*          description: category not found
*        '500':
*          description: error of server
*/

router.put("/:id", updateCategory);

/**
 /
* @swagger
* /categories/{id}:
*  delete:
*    summary:  Delete a category
*    tags: [Categories] 
*    description: Delete a category
*    parameters:
*       - name: id
*         in: path
*         description: ID of category to delete
*         example: 1
*         required: true
*         schema:
*           type: integer
*           format: int64
*    responses:
*        '200':
*          description: successfuly operation
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Category'  
*              example:
*                status: true
*                code: 200
*                message: Category deleted successfully
*                body:
*                  id: 1
*                  description: string
*                  name: string
*                  updatedAt: 2022-11-10T21:45:49.000Z
*                  createdAt: 2022-11-10T21:45:49.000Z        
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/Category'
*              example:
*                status: true
*                code: 200
*                message: Category deleted successfully
*                body:
*                  id: 1
*                  description: string
*                  name: string
*                  updatedAt: 2022-11-10T21:45:49.000Z
*                  createdAt: 2022-11-10T21:45:49.000Z
*        '400':
*          description: Invalid ID supplied
*        '404':
*          description: category not found
*        '500':
*          description: error of server
*/

router.delete("/:id", deleteCategory);


module.exports = router;