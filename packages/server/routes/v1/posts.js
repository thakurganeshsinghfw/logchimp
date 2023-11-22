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
 *   name: Posts
 *   description: Posts
 */

/**
 * @swagger
 * /posts/get:
 *   post:
 *     summary: Get posts
 *     tags: [Posts]
 */

router.post("/posts/get", post.filterPost);

/**
 * @swagger
 * /posts/slug:
 *   post:
 *     summary: Get posts Slug
 *     tags: [Posts]
 */
router.post("/posts/slug", exists, post.postBySlug);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create posts
 *     tags: [Posts]
 */
router.post("/posts", middleware.apiAuth, post.create);

/**
 * @swagger
 * /posts:
 *   patch:
 *     summary: posts
 *     tags: [Posts]
 */
router.patch("/posts", middleware.apiAuth, exists, post.updatePost);

/**
 * @swagger
 * /posts:
 *   delete:
 *     summary: Delete posts
 *     tags: [Posts]
 */

router.delete("/posts", middleware.apiAuth, exists, post.deleteById);

// post activity
/**
 * @swagger
 * /posts/:post_id/activity:
 *   get:
 *     summary: Get posts activity
 *     tags: [Posts]
 */

router.get("/posts/:post_id/activity", post.activity.get);

// post comment
/**
 * @swagger
 * /posts/:post_id/comments:
 *   post:
 *     summary: Create posts comment
 *     tags: [Posts]
 */
router.post(
  "/posts/:post_id/comments",
  middleware.apiAuth,
  post.comments.create,
);

/**
 * @swagger
 * /posts/:post_id/comments/:comment_id:
 *   put:
 *     summary: Update posts comment
 *     tags: [Posts]
 */

router.put(
  "/posts/:post_id/comments/:comment_id",
  middleware.apiAuth,
  post.comments.update,
);
/**
 * @swagger
 * /posts/:post_id/comments/:comment_id:
 *   delete:
 *     summary: Delete posts comment
 *     tags: [Posts]
 */

router.delete(
  "/posts/:post_id/comments/:comment_id",
  middleware.apiAuth,
  post.comments.destroy,
);

module.exports = router;
