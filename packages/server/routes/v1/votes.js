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
 *   name: Votes
 *   description: Votes
 */

/**
 * @swagger
 * /votes:
 *   post:
 *     summary: Add votes
 *     tags: [Votes]
 */

router.post("/votes", middleware.apiAuth, votes.add);

/**
 * @swagger
 * /votes:
 *   delete:
 *     summary: Delete votes
 *     tags: [Votes]
 */
router.delete("/votes", middleware.apiAuth, votes.remove);

module.exports = router;
