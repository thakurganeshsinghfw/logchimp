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
 *   name: Authentication API
 *   description: User authentication endpoints
 */


// Endpoint: /auth/signup
/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with email and password.
 *     tags: [Authentication API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Successfully registered a new user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     authToken:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     name:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     avatar:
 *                       type: string
 *       '400':
 *         description: Invalid input data
 *       '500':
 *         description: Internal server error
 */
router.post("/auth/signup", mailConfigExists, auth.signup);



// Endpoint: /auth/login
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication API]
 *     description: Login with valid credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Successfully registered a new user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     authToken:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     name:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     avatar:
 *                       type: string
 *       '400':
 *         description: Bad request, invalid input data
 *       '500':
 *         description: Internal server error
 */

router.post("/auth/login", exists, auth.login);


// Endpoint: /auth/setup - POST method
/**
 * @swagger
 * /api/v1/auth/setup:
 *   post:
 *     summary: Setup initial site configuration
 *     description: Set up initial site configuration including site title, admin name, email, and password.
 *     tags: [Authentication API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               siteTitle:
 *                 type: string
 *                 description: Title of the site.
 *               name:
 *                 type: string
 *                 description: Admin user's name.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Admin user's email address.
 *               password:
 *                 type: string
 *                 description: Admin user's password.
 *             required:
 *               - siteTitle
 *               - name
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Site setup successful
 *       '400':
 *         description: Invalid input data
 *       '500':
 *         description: Internal server error
 */
router.post("/auth/setup", mailConfigExists, auth.setup);


// Endpoint: /auth/setup - GET method
/**
 * @swagger
 * /api/v1/auth/setup:
 *   get:
 *     summary: Check site setup status
 *     tags: [Authentication API]
 *     description: Check if the site is already set up for authentication.
 *     responses:
 *       '200':
 *         description: Site setup status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  is_setup:
 *                    type: boolean
 *       '500':
 *         description: Internal server error
 */
router.get("/auth/setup", auth.isSiteSetup);


// email
// Endpoint: /auth/email/verify - POST method
/**
 * @swagger
 * /api/v1/auth/email/verify:
 *   post:
 *     summary: Verify email for authentication
 *     tags: [Authentication API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     description: Verify email for authentication purposes.
 *     responses:
 *       '200':
 *         description: Email verification successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  verify:
 *                    type: object
 *       '400':
 *         description: Bad request, invalid input data
 *       '500':
 *         description: Internal server error
 */
router.post("/auth/email/verify", mailConfigExists, exists, auth.email.verify);


// Endpoint: /auth/email/validate - POST method
/**
 * @swagger
 * /api/v1/auth/email/validate:
 *   post:
 *     summary: Validate user email
 *     tags: [Authentication API]
 *     description: Validates user email based on the provided email token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *             required:
 *               - token
 *     responses:
 *       '200':
 *         description: Email verified successfully
 *       '400':
 *         description: Invalid or expired email verification token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                       code:
 *                         type: string
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
 * /api/v1/auth/password/reset:
 *   post:
 *     summary: Request password reset
 *     description: Initiates a password reset request based on the provided email.
 *     tags: [Authentication API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       '200':
 *         description: Password reset request successful
 *       '400':
 *         description: Invalid or non-existent email address
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                       code:
 *                         type: string
 *       '500':
 *         description: Internal server error
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
 * /api/v1/auth/password/validateToken:
 *   post:
 *     summary: Validate reset password token
 *     description: Validates the reset password token.
 *     tags: [Authentication API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *             required:
 *               - token
 *     responses:
 *       '200':
 *         description: Reset password token is valid
 *       '400':
 *         description: Invalid or expired reset password token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 code:
 *                   type: string
 *                 err:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     message:
 *                       type: string
 *       '500':
 *         description: Internal server error
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
 * /api/v1/auth/password/set:
 *   post:
 *     summary: Set Password
 *     description: Set a new password using the reset password token.
 *     tags: [Authentication API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - token
 *               - password
 *     responses:
 *       '200':
 *         description: Password successfully updated
 *       '400':
 *         description: Invalid or expired reset password token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 code:
 *                   type: string
 *                 err:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     message:
 *                       type: string
 *       '500':
 *         description: Internal server error
 */

router.post(
  "/auth/password/set",
  validateEmailToken,
  exists,
  auth.password.set,
);

module.exports = router;
