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
 *   name: Settings
 *   description: Site Settings
 */

/**
 * @swagger
 * /settings/site:
 *   get:
 *     summary: Get Site Settings
 *     tags: [Settings]
 */

router.get("/settings/site", settings.siteSettings);

/**
 * @swagger
 * /settings/site:
 *   patch:
 *     summary: Settings
 *     tags: [Settings]
 */
router.patch("/settings/site", middlewares.apiAuth, settings.update);

/**
 * @swagger
 * /settings/update-logo:
 *   post:
 *     summary: Update logo
 *     tags: [Settings]
 */
router.post(
  "/settings/update-logo",
  middlewares.apiAuth,
  upload.single("logo", 1),
  settings.updateLogo,
);

/**
 * @swagger
 * /settings/labs:
 *   get:
 *     summary: Get Labs Settings
 *     tags: [Settings]
 */

router.get("/settings/labs", settings.getLabs);

/**
 * @swagger
 * /settings/labs:
 *   patch:
 *     summary: Labs Settings
 *     tags: [Settings]
 */

router.patch("/settings/labs", middlewares.apiAuth, settings.updateLabs);

module.exports = router;
