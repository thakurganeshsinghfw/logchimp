// modules
const express = require("express");
const router = express.Router();

// controller
const votes = require("../../controllers/votes");

// middleware
const middleware = require("../../middlewares");

/**
 * @swagger
 * tags:
 *   name: Votes API
 *   description: Votes
 */

/**
 * @swagger
 * /api/v1/votes:
 *   post:
 *     summary: Add votes
 *     tags: [Votes API]
 */

router.post("/votes", middleware.apiAuth, votes.add);

/**
 * @swagger
 * /api/v1/votes:
 *   delete:
 *     summary: Delete votes
 *     tags: [Votes API]
 */
router.delete("/votes", middleware.apiAuth, votes.remove);

module.exports = router;
