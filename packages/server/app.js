const express = require("express");
const cors = require("cors");
const path = require('path'); // Import the path module

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

app.use(express.static(path.join(__dirname, 'public')));


const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Feedback 360 - API Docs",
      version: "0.0.1",
      description: "API documentation for Feedback 360 - \n\nFeedback 360 is a step toward creating a robust feedback ecosystem, envisioned to become what IdeaExchange is for Salesforce. \n\nIt bridges the gap between the developer community and product teams by offering a streamlined and transparent feedback loop. Currently, the Ideas section in the Freshworks Developer Community allows users to post suggestions, but it falls short in providing comprehensive visibility to internal stakeholders and external members. Additionally, manually creating advocacy items and updating the status of ideas is labor-intensive and prone to delays, leaving the community disengaged. \n\nBy closing the feedback loop and fostering collaboration, Feedback 360 lays the foundation for a scalable, community-driven feedback platform that ensures alignment between user needs and product goals—on track to becoming the IdeaExchange of Freshworks.",
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
  customSiteTitle: 'Feedback 360 - API Docs',
};


// Set the default environment to be `development`
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// contains key-value pairs of data submitted in the request body
app.use(express.json());


// import all routes
app.use(routes);

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    // explorer: true,
    customCssUrl: "/api-docs/swagger-ui.css",
    customSiteTitle: "Feedback 360 - API Docs",
    customfavIcon: "/api-docs/FRSH.png", // Path to your favicon
    swaggerOptions: {
      customfavIcon: "/api-docs/FRSH.png", // Path to your favicon
      docExpansion: "none",
    },
  })
);

module.exports = app;
