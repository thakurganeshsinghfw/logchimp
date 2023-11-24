// modules
const express = require("express");
const router = express.Router();

// controller
const roadmaps = require("../../controllers/roadmaps");

// middleware
const middleware = require("../../middlewares");
const exists = require("../../middlewares/roadmapExists");

/**
 * @swagger
 * tags:
 *   name: Roadmaps API
 *   description: Roadmaps
 */

/**
 * @swagger
 * /api/v1/roadmaps:
 *   get:
 *     summary: Get Roadmaps
 *     tags: [Roadmaps API]
 */

router.get("/roadmaps", roadmaps.filter);

/**
 * @swagger
 * /api/v1/roadmaps/:url:
 *   get:
 *     summary: Get Roadmaps by URL
 *     tags: [Roadmaps API]
 */

router.get("/roadmaps/:url", exists, roadmaps.roadmapByUrl);

/**
 * @swagger
 * /api/v1/roadmaps/search/:name:
 *   get:
 *     summary: Search Roadmaps by Name
 *     tags: [Roadmaps API]
 */
router.get(
  "/roadmaps/search/:name",
  middleware.apiAuth,
  roadmaps.searchRoadmap,
);

/**
 * @swagger
 * /api/v1/roadmaps:
 *   post:
 *     summary: Create Roadmaps
 *     tags: [Roadmaps API]
 */

router.post("/roadmaps", middleware.apiAuth, roadmaps.create);

/**
 * @swagger
 * /api/v1/roadmaps:
 *   patch:
 *     summary: Roadmaps
 *     tags: [Roadmaps API]
 */

router.patch("/roadmaps", middleware.apiAuth, exists, roadmaps.updateRoadmap);

/**
 * @swagger
 * /api/v1/roadmaps/sort:
 *   patch:
 *     summary: Sort Roadmaps
 *     tags: [Roadmaps API]
 */
router.patch("/roadmaps/sort", middleware.apiAuth, roadmaps.sort);

/**
 * @swagger
 * /api/v1/roadmaps:
 *   delete:
 *     summary: Delete Roadmaps
 *     tags: [Roadmaps API]
 */

router.delete("/roadmaps", middleware.apiAuth, exists, roadmaps.deleteById);

module.exports = router;
