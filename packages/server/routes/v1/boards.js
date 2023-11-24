// modules
const express = require("express");
const router = express.Router();

// controller
const boards = require("../../controllers/boards");

// middleware
const middleware = require("../../middlewares");
const exists = require("../../middlewares/boardExists");

/**
 * @swagger
 * tags:
 *   name: Boards API
 *   description: Boards
 */

/**
 * @swagger
 * /api/v1/boards:
 *   get:
 *     summary: Boards
 *     tags: [Boards API]
 */

router.get("/boards", boards.filter);

/**
 * @swagger
 * /api/v1/boards/get:
 *   get:
 *     summary: Get Boards
 *     tags: [Boards API]
 */

router.get("/boards/get", boards.get);

/**
 * @swagger
 * /api/v1/boards/:url:
 *   get:
 *     summary: Boards by URL
 *     tags: [Boards API]
 */

router.get("/boards/:url", exists, boards.boardByUrl);

/**
 * @swagger
 * /api/v1/boards/search/:name:
 *   get:
 *     summary: Boards by Name
 *     tags: [Boards API]
 */

router.get("/boards/search/:name", middleware.apiAuth, boards.searchBoard);

/**
 * @swagger
 * /api/v1/boards/check-name:
 *   post:
 *     summary: Check Board Name
 *     tags: [Boards API]
 */

router.post("/boards/check-name", middleware.apiAuth, boards.checkName);

/**
 * @swagger
 * /api/v1/boards:
 *   post:
 *     summary: Create Board
 *     tags: [Boards API]
 */
router.post("/boards", middleware.apiAuth, boards.create);

/**
 * @swagger
 * /api/v1/boards:
 *   patch:
 *     summary: Boards
 *     tags: [Boards API]
 */

router.patch("/boards", middleware.apiAuth, exists, boards.updateBoard);

/**
 * @swagger
 * /api/v1/boards:
 *   delete:
 *     summary: Delete Boards
 *     tags: [Boards API]
 */

router.delete("/boards", middleware.apiAuth, exists, boards.deleteById);

module.exports = router;
