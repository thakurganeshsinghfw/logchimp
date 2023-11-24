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
 *     summary: Get All Boards
 *     description: Retrieve a list of boards with pagination and sorting options.
 *     tags: [Boards API]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         explode: true
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         explode: true
 *         schema:
 *           type: integer
 *       - name: sort
 *         in: query
 *         description: Sort order for boards
 *         required: false
 *         explode: true
 *         schema:
 *           type: string
 *           default: DESC
 *           enum: [ASC, DESC]
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 board:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       boardId:
 *                         type: string
 *                       name:
 *                         type: string
 *                       color:
 *                         type: string
 *                       url:
 *                         type: string
 *                       post_count:
 *                         type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *       '400':
 *         description: Bad request - Invalid input data
 *       '500':
 *         description: Internal server error
 */

router.get("/boards", boards.filter);

/**
 * @swagger
 * /api/v1/boards/get:
 *   get:
 *     summary: Get Boards
 *     tags: [Boards API]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         explode: true
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         explode: true
 *         schema:
 *           type: integer
 *       - name: sort
 *         in: query
 *         description: Sort order for boards
 *         required: false
 *         explode: true
 *         schema:
 *           type: string
 *           default: DESC
 *           enum: [ASC, DESC]
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       boardId:
 *                         type: string
 *                       name:
 *                         type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *       '400':
 *         description: Bad request - Invalid input data
 *       '500':
 *         description: Internal server error
 */

router.get("/boards/get", boards.get);

/**
 * @swagger
 * /api/v1/boards/:url:
 *   get:
 *     summary: Boards by URL
 *     tags: [Boards API]
 *     parameters:
 *       - name: url
 *         in: path
 *         description: URL of the board
 *         required: false
 *         explode: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       boardId:
 *                         type: string
 *                       name:
 *                         type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *       '400':
 *         description: Bad request - Invalid input data
 *       '500':
 *         description: Internal server error
 */

router.get("/boards/:url", exists, boards.boardByUrl);

/**
 * @swagger
 * /api/v1/boards/search/:name:
 *   get:
 *     summary: Boards by Name
 *     tags: [Boards API]
 *     parameters:
 *       - name: name
 *         in: path
 *         description: Name of the board
 *         required: false
 *         explode: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       boardId:
 *                         type: string
 *                       name:
 *                         type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *       '400':
 *         description: Bad request - Invalid input data
 *       '500':
 *         description: Internal server error
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
 * /api/v1/boards/check-name:
 *   post:
 *     summary: Check Board Name Availability
 *     tags: [Boards API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Board name to check
 *     responses:
 *       '200':
 *         description: Board name is available
 *       '400':
 *         description: Bad request - Invalid input data
 *       '401':
 *         description: Unauthorized - Authorization header missing or invalid
 *       '500':
 *         description: Internal server error
 */

router.post("/boards", middleware.apiAuth, boards.create);

/**
 * @swagger
 * /api/v1/boards:
 *   patch:
 *     summary: Update a board
 *     description: Update board details such as name, URL, color, view voters permission, and display status.
 *     tags: [Boards API]
 *     parameters:
 *       - name: boardId
 *         in: query
 *         description: Board ID
 *         required: true
 *         explode: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               url:
 *                 type: string
 *               color:
 *                 type: string
 *               view_voters:
 *                 type: boolean
 *               display:
 *                 type: boolean
 *             required:
 *               - name
 *               - url
 *               - color
 *               - view_voters
 *               - display
 *     responses:
 *       '200':
 *         description: Board deleted successfully
 *       '400':
 *         description: Bad request - Invalid input data
 *       '401':
 *         description: Unauthorized - User is not authenticated
 *       '500':
 *         description: Internal server error
 */

router.patch("/boards", middleware.apiAuth, exists, boards.updateBoard);

/**
 * @swagger
 * /api/v1/boards/{boardId}:
 *   delete:
 *     summary: Delete a board
 *     description: Delete a board using the board ID.
 *     tags: [Boards API]
 *     parameters:
 *       - in: path
 *         name: boardId
 *         description: ID of the board to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Board deleted successfully
 *       '400':
 *         description: Bad request - Invalid board ID
 *       '401':
 *         description: Unauthorized - User is not authenticated
 *       '404':
 *         description: Invalid Board ID - Board not found with given ID
 *       '500':
 *         description: Internal server error
 */


router.delete("/boards", middleware.apiAuth, exists, boards.deleteById);

module.exports = router;
