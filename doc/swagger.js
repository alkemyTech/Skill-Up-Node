const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const port = process.env.PORT || 3000;

const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AlkyBank API",
      description: "Develop a digital wallet to integrate into customers' Homebanking and facilitate their transactions in a fast, fluid and secure way ",
      termsOfService: "http://swagger.io/terms/",
      contact: {
        email: "waltongerman@gmail.com luisdelaespriellaj@hotmail.com cavalerohugo92@gmail.com arielcesarantoniovillafuerte@gmail.com brayanandresrl@ufps.edu.co canterosagustindev@gmail.com"
      },
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          description: "Security system",
          scheme: "bearer",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: `http://localhost:${port}/api`,
      },
    ],
  },

  apis: [`${path.join(__dirname, "../routes/*.js")}`],
};
module.exports = {
  swaggerJsDoc,
  swaggerUi,
  swaggerSpec,
};
