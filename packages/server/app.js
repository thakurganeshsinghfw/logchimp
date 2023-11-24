const express = require("express");
const cors = require("cors");

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const routes = require("./routes");

const app = express();
app.disable("x-powered-by");


// enable all CORS requests
app.use(cors());

// utils
const logchimpConfig = require("./utils/logchimpConfig");
const config = logchimpConfig();
if (!config) {
  console.log(
    "LogChimp configuration missing!\nTry running this command 'logchimp install' again.",
  );
  process.exit(1);
}

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Feedback Hub API Docs",
      version: "0.0.1",
      description: "API documentation for Feedback Hub",
    },
    servers: [
      {
        description: "local",
        url: 'http://localhost:3000'
      },
      {
        description: "prod",
        url: 'https://freshworks.dev/logchimp'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/v1/*.js'],
};



// Set the default environment to be `development`
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// contains key-value pairs of data submitted in the request body
app.use(express.json());


// import all routes
app.use(routes);

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


module.exports = app;
