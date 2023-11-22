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
 *   name: Boards
 *   description: Boards
 */

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: Boards
 *     tags: [Boards]
 */

router.get("/boards", boards.filter);

/**
 * @swagger
 * /boards/get:
 *   get:
 *     summary: Get Boards
 *     tags: [Boards]
 */

router.get("/boards/get", boards.get);

/**
 * @swagger
 * /boards/:url:
 *   get:
 *     summary: Boards by URL
 *     tags: [Boards]
 */

router.get("/boards/:url", exists, boards.boardByUrl);

/**
 * @swagger
 * /boards/search/:name:
 *   get:
 *     summary: Boards by Name
 *     tags: [Boards]
 */

router.get("/boards/search/:name", middleware.apiAuth, boards.searchBoard);

/**
 * @swagger
 * /boards/check-name:
 *   post:
 *     summary: Check Board Name
 *     tags: [Boards]
 */

router.post("/boards/check-name", middleware.apiAuth, boards.checkName);

/**
 * @swagger
 * /boards:
 *   post:
 *     summary: Create Board
 *     tags: [Boards]
 */
router.post("/boards", middleware.apiAuth, boards.create);

/**
 * @swagger
 * /boards:
 *   patch:
 *     summary: Boards
 *     tags: [Boards]
 */

router.patch("/boards", middleware.apiAuth, exists, boards.updateBoard);

/**
 * @swagger
 * /boards:
 *   delete:
 *     summary: Delete Boards
 *     tags: [Boards]
 */

router.delete("/boards", middleware.apiAuth, exists, boards.deleteById);

module.exports = router;
