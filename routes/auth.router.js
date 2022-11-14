const express = require("express");
const { validateRequestSchema } = require("../middlewares/validation/validateSchema.middleware");
const loginSchema = require("../schemas/login.schema");
const { login } = require("../controllers/auth.controller");


const router = express.Router();

/**
 * @swagger
 * /auth/login:     
 *   post:
 *     summary: Authorize the user
 *     tags: [User]
 *     description: Allows the user to login
 *     requestBody:
 *       description: Get all users
 *       content:
 *         application/json:
 *            schema: 
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *            example:
 *              email: luis@example.com
 *              password: prueba
 *         application/xml:
 *            schema: 
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *            example:
 *              email: luis@example.com
 *              password: prueba
 *         application/x-www-form-urlencoded:
 *            schema: 
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *            example:
 *              email: luis@example.com
 *              password: prueba
 *         required: true
 *     responses:
 *       '200':
 *         description: Ok - successful operation
 *         content:
 *            application/json:
 *               schema: 
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *               example:
 *                 status: true
 *                 code: 200
 *                 message: User login successfully
 *                 body:
 *                   ok: true
 *                   user: luis@example.com
 *                   token: eyJhbGciOiJIUzI1NiJ9.MQ.gaKRuIIRNvXiTlyNPE1Kp3SpAQfhrI3r9MrSB1YdMz8
 *       '400':
 *         description: Bad Request - some parameter entered does not correspond to the requirements of the endpoint.
 *       '403':
 *         description: Forbidden - Invalid password
 *       '404':
 *         description: Resource not found - A user with the specified ID was not found.
 *       '500':
 *         description: Internal Server Error
 */
router.post("/login", validateRequestSchema(loginSchema), login);


module.exports = router;