// modules
const express = require("express");
const router = express.Router();

// controller
const post = require("../../controllers/post");

// middleware
const middleware = require("../../middlewares");
const exists = require("../../middlewares/postExists");


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

module.exports = router;
