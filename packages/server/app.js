const express = require("express");
const cors = require("cors");

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const routes = require("./routes");

const app = express();
app.disable("x-powered-by");

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
    info: {
      title: 'LogChimp API',
      description: 'Documentation for LogChimp APIs',
      version: '1.0.0',
    },
  },
  apis: ['./routes/v1/*.js'], // Define paths to your route files
};


// Set the default environment to be `development`
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// contains key-value pairs of data submitted in the request body
app.use(express.json());

// enable all CORS requests
app.use(cors());

// import all routes
app.use(routes);

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


module.exports = app;
