const express = require("express");
const {
  createUsers,
  deleteUser,
  getAllUsers,
  editUser,
  getUserById,
} = require("../controllers/user.controller");
const createUserSchema = require("../schemas/user/createUser.schema");
const deleteUserSchema = require("../schemas/user/deleteUser.schema");
const editUserSchema = require("../schemas/user/editUser.schema");
const {
  validateRequestSchema,
} = require("../middlewares/validation/validateSchema.middleware");
const getByIdSchema = require("../schemas/user/getById.schema");
const avatarUpload = require("../middlewares/multer/avatarUpload");
const ownershipMiddleware = require("../middlewares/auth/ownership.middleware");
const authMiddleware = require("../middlewares/auth/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * components:
 *     schemas:
 *       User:
 *         type: object
 *         properties:
 *           firstName:
 *             type: string
 *           lastName:
 *             type: string
 *           email:
 *             type: string
 *           password:
 *             type: string
 *           avatar:
 *             type: string
 *             format: binary
 *           roleId:
 *             type: integer
 *             default: 2
 *         required:
 *            - firstName
 *            - lastName
 *            - email
 *            - password
 *
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Find all users
 *     tags: [User]
 *     description: Find all users.
 *     parameters:
 *        - name: page
 *          in: query
 *          description: Filter by page.
 *          schema:
 *             type: integer
 *             format: int64
 *             example: 1
 *     responses:
 *       '200':
 *            description: Ok - successful operation
 *            content:
 *               application/json:
 *                 schema:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                   example:
 *                     status: true
 *                     code: 200
 *                     message: Users obtained successfully
 *                     body:
 *                        firstName: Mandy
 *                        lastName: Pyford
 *                        email: mpyford0@xinhuanet.com
 *                        createdAt: 2022-11-10T21:45:49.000Z
 *   post:
 *     summary: Create user
 *     tags: [User]
 *     description: Register an user.
 *     requestBody:
 *       description: Get all users
 *       content:
 *         multipart/form-data:
 *            schema: 
 *              $ref: '#/components/schemas/User'
 *            example:
 *              firstName: luis
 *              lastName: de la espriella
 *              email: luis@example.com
 *              password: prueba
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *            example:
 *              firstName: luis
 *              lastName: de la espriella
 *              email: luis@example.com
 *              password: prueba
 *         application/xml:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *            example:
 *              firstName: luis
 *              lastName: de la espriella
 *              email: luis@example.com
 *              password: prueba
 *         application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *            example:
 *              firstName: luis
 *              lastName: de la espriella
 *              email: luis@example.com
 *              password: prueba
 *         required: true
 *     responses:
 *       '200':
 *         description: Ok - successful operation
 *         content:
 *            application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *               example:
 *                 status: true
 *                 code: 200
 *                 message: Users was created
 *                 body:
 *                   firstName: luis
 *                   lastName: de la espriella
 *                   email: luis@example.com
 *                   token: eyJhbGciOiJIUzI1NiJ9.MQ.gaKRuIIRNvXiTlyNPE1Kp3SpAQfhrI3r9MrSB1YdMz8
 *       '400':
 *         description: Bad Request - some parameter entered does not correspond to the requirements of the endpoint.
 *       '500':
 *         description: Internal Server Error
 */
router.get("/", authMiddleware, ownershipMiddleware, getAllUsers);
router.post(
  "/",
  avatarUpload,
  validateRequestSchema(createUserSchema),
  createUsers
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Find user by Id
 *     tags: [User]
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID of user to return.
 *          schema:
 *             type: integer
 *             format: int64
 *             example: 1
 *     responses:
 *       '200':
 *         description: Ok - successful operation
 *         content:
 *            application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *               example:
 *                 firstName: luis
 *                 lastName: de la espriella
 *                 email: luis@example.com
 *                 token: eyJhbGciOiJIUzI1NiJ9.MQ.gaKRuIIRNvXiTlyNPE1Kp3SpAQfhrI3r9MrSB1YdMz8
 *       '400':
 *         description: Bad Request - The specified user ID is invalid (not a number).
 *       '404':
 *         description: Resource not found - A user with the specified ID was not found.
 *       '500':
 *         description: Internal Server Error
 *   put:
 *     summary: Edit user by Id
 *     tags: [User]
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID of user to edit.
 *          schema:
 *             type: integer
 *             format: int64
 *             example: 1
 *     requestBody:
 *          description: Update a user by id
 *          content:
 *            multipart/form-data:
 *               schema: 
 *                 $ref: '#/components/schemas/User'
 *               example:
 *                 firstName: luis
 *                 lastName: de la espriella
 *                 email: luis@example.com
 *                 password: prueba
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *              example:
 *                firstName: luis
 *                lastName: de la espriella
 *                email: luis@example.com
 *                password: prueba
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *              example:
 *                firstName: luis
 *                lastName: de la espriella
 *                email: luis@example.com
 *                password: prueba
 *            application/x-www-form-urlencoded:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *              example:
 *                firstName: luis
 *                lastName: de la espriella
 *                email: luis@example.com
 *                password: prueba
 *            required: true
 *     responses:
 *       '200':
 *         description: Ok - successful operation
 *         content:
 *            application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *               example:
 *                 status: true
 *                 code: 200
 *                 message: User was edited
 *       '400':
 *         description: Bad Request - The specified user ID is invalid (not a number).
 *       '404':
 *         description: Resource not found - A user with the specified ID was not found.
 *       '500':
 *         description: Internal Server Error
 *   delete:
 *     summary: Delete user by Id
 *     tags: [User]
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID of user to delete.
 *          schema:
 *             type: integer
 *             format: int64
 *             example: 1
 *     responses:
 *       '200':
 *         description: Ok - successful operation
 *         content:
 *            application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *               example:
 *                 status: true
 *                 code: 200
 *                 message: successfully deleted user
 *       '400':
 *         description: Bad Request - The specified user ID is invalid (not a number).
 *       '404':
 *         description: Resource not found - A user with the specified ID was not found.
 *       '500':
 *         description: Internal Server Error
 *
 */
router.get(
  "/:id",
  validateRequestSchema(getByIdSchema),
  authMiddleware,
  ownershipMiddleware,
  getUserById
);
router.put(
  "/:id",
  avatarUpload,
  validateRequestSchema(editUserSchema),
  authMiddleware,
  ownershipMiddleware,
  editUser
);
router.delete(
  "/:id",
  validateRequestSchema(deleteUserSchema),
  authMiddleware,
  ownershipMiddleware,
  deleteUser
);

module.exports = router;
