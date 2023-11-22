const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0", // Use the version of OpenAPI Specification (OAS) you prefer
    info: {
      title: "Your API", // Replace with your API name
      version: "1.0.0", // Replace with your API version
      description: "API documentation for your application",
    },
  },
  apis: ["./routes/v1/*.js"], // Define paths to the files containing Swagger annotations
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerUi };
