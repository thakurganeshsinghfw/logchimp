// modules
const express = require("express");
const router = express.Router();

// controller
const post = require("../../controllers/post");
const searchPost = require("../../controllers/post/searchPost");

// middleware
const middleware = require("../../middlewares");
const exists = require("../../middlewares/postExists");

// Upload service
const uploadController = require('../../controllers/upload/upload');

/**
 * @swagger
 * tags:
 *   name: Posts API
 *   description: Posts
 */

/**
 * @swagger
 * /api/v1/posts/get:
 *   post:
 *     summary: Get posts
 *     tags: [Posts API]
 */

router.post("/posts/get", post.filterPost);

/**
 * @swagger
 * /api/v1/posts/slug:
 *   post:
 *     summary: Get posts Slug
 *     tags: [Posts API]
 */
router.post("/posts/slug", exists, post.postBySlug);

/**
 * @swagger
 * /api/v1/posts:
 *   post:
 *     summary: Create posts
 *     tags: [Posts API]
 */
router.post("/posts", middleware.apiAuth, post.create);

/**
 * @swagger
 * /api/v1/posts:
 *   patch:
 *     summary: posts
 *     tags: [Posts API]
 */
router.patch("/posts", middleware.apiAuth, exists, post.updatePost);

/**
 * @swagger
 * /api/v1/posts:
 *   delete:
 *     summary: Delete posts
 *     tags: [Posts API]
 */

router.delete("/posts", middleware.apiAuth, exists, post.deleteById);

// post activity
/**
 * @swagger
 * /api/v1/posts/:post_id/activity:
 *   get:
 *     summary: Get posts activity
 *     tags: [Posts API]
 */

router.get("/posts/:post_id/activity", post.activity.get);

// post comment
/**
 * @swagger
 * /api/v1/posts/:post_id/comments:
 *   post:
 *     summary: Create posts comment
 *     tags: [Posts API]
 */
router.post(
  "/posts/:post_id/comments",
  middleware.apiAuth,
  post.comments.create,
);

/**
 * @swagger
 * /api/v1/posts/:post_id/comments/:comment_id:
 *   put:
 *     summary: Update posts comment
 *     tags: [Posts API]
 */

router.put(
  "/posts/:post_id/comments/:comment_id",
  middleware.apiAuth,
  post.comments.update,
);
/**
 * @swagger
 * /api/v1/posts/:post_id/comments/:comment_id:
 *   delete:
 *     summary: Delete posts comment
 *     tags: [Posts API]
 */

router.delete(
  "/posts/:post_id/comments/:comment_id",
  middleware.apiAuth,
  post.comments.destroy,
);

// New routes for homepage enhancements

/**
 * @swagger
 * /api/v1/posts/featured:
 *   get:
 *     summary: Get featured posts
 *     tags: [Posts API]
 *     responses:
 *       200:
 *         description: Array of featured posts
 */
router.get("/posts/featured", post.getFeaturedPosts);


/**
 * @swagger
 * /api/v1/posts/trending:
 *   get:
 *     summary: Get trending posts
 *     tags: [Posts API]
 *     responses:
 *       200:
 *         description: Array of trending posts
 */
router.get("/posts/trending", post.getTrendingPosts);


/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Posts API]
 *     responses:
 *       200:
 *         description: Array of categories
 */
router.get("/categories", post.getAllCategories);


/**
 * @swagger
 * /api/v1/upload:
 *   post:
 *     summary: Upload media to S3
 *     tags: [Upload API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: Base64 encoded media URL
 *     responses:
 *       200:
 *         description: URL of uploaded media
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *       500:
 *         description: Upload failed
 */
router.post('/upload', uploadController.upload);

// New route for searching posts
/**
 * @swagger
 * /api/v1/posts/search:
 *   get:
 *     summary: Search posts
 *     tags: [Posts API]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: false
 *         description: Search query
 *       - in: query
 *         name: board
 *         schema:
 *           type: string
 *         required: false
 *         description: Board filter
 *       - in: query
 *         name: roadmap
 *         schema:
 *           type: string
 *         required: false
 *         description: Roadmap filter
 *     responses:
 *       200:
 *         description: Array of posts
 */
router.get("/posts/search", searchPost.searchPosts);

module.exports = router;
