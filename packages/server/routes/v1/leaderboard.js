// modules
const express = require("express");
const router = express.Router();
const getLeaderboard = require("../../controllers/leaderboard");


/**
 * @swagger
 * tags:
 *   name: Analytics API
 *   description: Posts
 */

/**
 * @swagger
 * /api/v1/leaderboard:
 *   get:
 *     summary: Get leaderboard data
 *     tags: [Analytics API]
 *     parameters:
 *       - in: query
 *         name: metric
 *         schema:
 *           type: string
 *           enum: [posts, comments, upvotes, others]
 *           default: posts
 *         description: Metric to sort the leaderboard by
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of top contributors to return
 *     responses:
 *       200:
 *         description: List of top contributors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   avatarUrl:
 *                     type: string
 *                   posts:
 *                     type: integer
 *                   comments:
 *                     type: integer
 *                   upvotes:
 *                     type: integer
 *                   others:
 *                     type: integer
 *       500:
 *         description: Internal server error
 */

router.get('/leaderboard', getLeaderboard);

module.exports = router;

