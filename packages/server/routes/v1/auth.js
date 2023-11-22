// modules
const express = require("express");
const router = express.Router();

// controller
const auth = require("../../controllers/auth");

// middleware
const exists = require("../../middlewares/userExists");
const mailConfigExists = require("../../middlewares/mailConfigExists");
const validateEmailToken = require("../../middlewares/validateEmailToken");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

// Endpoint: /auth/signup
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     description: Register a new user with provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       '200':
 *         description: User successfully registered
 *       '400':
 *         description: Bad request, invalid input data
 *       '500':
 *         description: Internal server error
 */

router.post("/auth/signup", mailConfigExists, auth.signup);



// Endpoint: /auth/login
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     description: Login with valid credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       '200':
 *         description: User successfully logged in
 *       '400':
 *         description: Bad request, invalid input data
 *       '500':
 *         description: Internal server error
 */

router.post("/auth/login", exists, auth.login);


// Endpoint: /auth/setup - POST method
/**
 * @swagger
 * /auth/setup:
 *   post:
 *     summary: Setup authentication
 *     tags: [Authentication]
 *     description: Set up authentication configuration.
 *     responses:
 *       '200':
 *         description: Authentication setup successful
 *       '400':
 *         description: Bad request, invalid input data
 *       '500':
 *         description: Internal server error
 */
router.post("/auth/setup", mailConfigExists, auth.setup);

// Endpoint: /auth/setup - GET method
/**
 * @swagger
 * /auth/setup:
 *   get:
 *     summary: Check site setup status
 *     tags: [Authentication]
 *     description: Check if the site is already set up for authentication.
 *     responses:
 *       '200':
 *         description: Site setup status retrieved successfully
 *       '500':
 *         description: Internal server error
 */
router.get("/auth/setup", auth.isSiteSetup);

// email
// Endpoint: /auth/email/verify - POST method
/**
 * @swagger
 * /auth/email/verify:
 *   post:
 *     summary: Verify email for authentication
 *     tags: [Authentication]
 *     description: Verify email for authentication purposes.
 *     responses:
 *       '200':
 *         description: Email verification successful
 *       '400':
 *         description: Bad request, invalid input data
 *       '500':
 *         description: Internal server error
 */
router.post("/auth/email/verify", mailConfigExists, exists, auth.email.verify);


// Endpoint: /auth/email/validate - POST method
/**
 * @swagger
 * /auth/email/validate:
 *   post:
 *     summary: Validate email for authentication
 *     tags: [Authentication]
 *     description: Validate email for authentication purposes.
 *     responses:
 *       '200':
 *         description: Email validation successful
 *       '400':
 *         description: Bad request, invalid input data
 *       '500':
 *         description: Internal server error
 */
router.post(
  "/auth/email/validate",
  validateEmailToken,
  exists,
  auth.email.validate,
);

// password
// Endpoint: /auth/password/reset - POST method
/**
 * @swagger
 * /auth/password/reset:
 *   post:
 *     summary: Reset password
 *     tags: [Authentication]
 */

router.post(
  "/auth/password/reset",
  mailConfigExists,
  exists,
  auth.password.reset,
);

// Endpoint: /auth/password/validateToken - POST method
/**
 * @swagger
 * /auth/password/validateToken:
 *   post:
 *     summary: Validate token
 *     tags: [Authentication]
 */

router.post(
  "/auth/password/validateToken",
  validateEmailToken,
  exists,
  auth.password.validateToken,
);

// Endpoint: /auth/password/set - POST method
/**
 * @swagger
 * /auth/password/set:
 *   post:
 *     summary: Set Password
 *     tags: [Authentication]
 */

router.post(
  "/auth/password/set",
  validateEmailToken,
  exists,
  auth.password.set,
);

module.exports = router;
