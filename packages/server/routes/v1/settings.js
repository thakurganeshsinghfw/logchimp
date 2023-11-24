// modules
const path = require("path");
const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../../../content/images"));
  },
  filename: (req, file, cb) => {
    const fileExtension =
      file.originalname.split(".")[file.originalname.split(".").length - 1];
    const fileName = Date.now().toString(32);

    cb(null, `${fileName}.${fileExtension}`);
  },
});

const upload = multer({
  storage,
});

// controller
const settings = require("../../controllers/settings");

// middleware
const middlewares = require("../../middlewares");

/**
 * @swagger
 * tags:
 *   name: Settings API
 *   description: Site Settings
 */

/**
 * @swagger
 * /api/v1/settings/site:
 *   get:
 *     summary: Get Site Settings
 *     description: "Retrieve site settings including title, description, accent color, Google Analytics ID, and allow signup status."
 *     tags: [Settings API]
 *     responses:
 *       '200':
 *         description: "Successful operation"
 *         schema:
 *           type: "object"
 *           properties:
 *             title:
 *               type: "string"
 *             description:
 *               type: "string"
 *             accentColor:
 *               type: "string"
 *             googleAnalyticsId:
 *               type: "string"
 *             allowSignup:
 *               type: "boolean"
 *         examples:
 *           application/json:
 *             title: "Your Site Title"
 *             description: "Your Site Description"
 *             accentColor: "#FFFFFF"
 *             googleAnalyticsId: "UA-123456789-1"
 *             allowSignup: true
 *       '400':
 *         description: "Bad request - Invalid input data"
 *       '401':
 *         description: "Unauthorized - Invalid or missing authentication token"
 *       '500':
 *         description: "Internal server error"
 */
router.get("/settings/site", settings.siteSettings);



/**
 * @swagger
 * /api/v1/settings/site:
 *   patch:
 *     summary: Update site settings
 *     description: Update site settings including title, description, accent color, Google Analytics ID, and allow signup status.
 *     tags: [Settings API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               accentColor:
 *                 type: string
 *               googleAnalyticsId:
 *                 type: string
 *               allowSignup:
 *                 type: string
 *           example:
 *             title: "Site Title"
 *             description: "Site Description"
 *             accentColor: "#FFFFFF"
 *             googleAnalyticsId: "UA-123456789-1"
 *             allowSignup: true
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Site settings updated successfully
 *       '400':
 *         description: Bad request - Invalid input data
 *       '401':
 *         description: Unauthorized - Invalid or missing authentication token
 *       '500':
 *         description: Internal server error
 */
router.patch("/settings/site", middlewares.apiAuth, settings.update);

/**
 * @swagger
 * /api/v1/settings/update-logo:
 *   post:
 *     summary: Update logo
 *     tags: [Settings API]
 */
router.post(
  "/settings/update-logo",
  middlewares.apiAuth,
  upload.single("logo", 1),
  settings.updateLogo,
);

/**
 * @swagger
 * /api/v1/settings/labs:
 *   get:
 *     summary: Get Labs Settings
 *     tags: [Settings API]
 */

router.get("/settings/labs", settings.getLabs);

/**
 * @swagger
 * /api/v1/settings/labs:
 *   patch:
 *     summary: Labs Settings
 *     tags: [Settings API]
 */

router.patch("/settings/labs", middlewares.apiAuth, settings.updateLabs);

module.exports = router;
