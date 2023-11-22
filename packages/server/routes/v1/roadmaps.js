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
 *   name: Roadmaps
 *   description: Roadmaps
 */

/**
 * @swagger
 * /roadmaps:
 *   get:
 *     summary: Get Roadmaps
 *     tags: [Roadmaps]
 */

router.get("/roadmaps", roadmaps.filter);

/**
 * @swagger
 * /roadmaps/:url:
 *   get:
 *     summary: Get Roadmaps by URL
 *     tags: [Roadmaps]
 */

router.get("/roadmaps/:url", exists, roadmaps.roadmapByUrl);

/**
 * @swagger
 * /roadmaps/search/:name:
 *   get:
 *     summary: Search Roadmaps by Name
 *     tags: [Roadmaps]
 */
router.get(
  "/roadmaps/search/:name",
  middleware.apiAuth,
  roadmaps.searchRoadmap,
);

/**
 * @swagger
 * /roadmaps:
 *   post:
 *     summary: Create Roadmaps
 *     tags: [Roadmaps]
 */

router.post("/roadmaps", middleware.apiAuth, roadmaps.create);

/**
 * @swagger
 * /roadmaps:
 *   patch:
 *     summary: Roadmaps
 *     tags: [Roadmaps]
 */

router.patch("/roadmaps", middleware.apiAuth, exists, roadmaps.updateRoadmap);

/**
 * @swagger
 * /roadmaps/sort:
 *   patch:
 *     summary: Sort Roadmaps
 *     tags: [Roadmaps]
 */
router.patch("/roadmaps/sort", middleware.apiAuth, roadmaps.sort);

/**
 * @swagger
 * /roadmaps:
 *   delete:
 *     summary: Delete Roadmaps
 *     tags: [Roadmaps]
 */

router.delete("/roadmaps", middleware.apiAuth, exists, roadmaps.deleteById);

module.exports = router;
