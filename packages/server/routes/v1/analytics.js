const express = require("express");
const router = express.Router();
const analyticsController = require("../../controllers/analytics/analytics");

/**
 * @swagger
 * tags:
 *   name: Analytics API
 *   description: Post Analytics endpoints
 */


/**
 * @swagger
 * /analytics:
 *   get:
 *     summary: Get analytics data
 *     tags: [Analytics API]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering analytics data
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering analytics data
 *     responses:
 *       '200':
 *         description: Analytics data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 engagementRate:
 *                   type: string
 *                 resolutionRate:
 *                   type: string
 *                 responseRate:
 *                   type: string
 *                 mvpInteractionRate:
 *                   type: string
 *                 totalUpvotes:
 *                   type: integer
 *                 totalComments:
 *                   type: integer
 *                 resolvedPosts:
 *                   type: integer
 *                 respondedPosts:
 *                   type: integer
 *                 mvpPosts:
 *                   type: integer
 *                 totalPosts:
 *                   type: integer
 *       '500':
 *         description: Internal server error
 */
router.get('/analytics', analyticsController);

module.exports = router;
