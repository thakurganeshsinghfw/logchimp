// modules
const express = require("express");
const router = express.Router();

// controller
const users = require("../../controllers/users");

// middleware
const middleware = require("../../middlewares");

/**
 * @swagger
 * tags:
 *   name: Users API
 *   description: Users
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get Users
 *     tags: [Users API]
 */

router.get("/users", users.filter);

/**
 * @swagger
 * /api/v1/users/profile:
 *   get:
 *     summary: Get Users profile
 *     tags: [Users API]
 */
router.get("/users/profile", middleware.apiAuth, users.getProfile);

/**
 * @swagger
 * /api/v1/users/profile:
 *   patch:
 *     summary: Users Profile
 *     tags: [Users API]
 */
router.patch("/users/profile", middleware.apiAuth, users.updateProfile);

/**
 * @swagger
 * /api/v1/users/permissions:
 *   get:
 *     summary: Get Users Permissions
 *     tags: [Users API]
 */
router.get("/users/permissions", middleware.apiAuth, users.getUserPermissions);

/**
 * @swagger
 * /api/v1/users/dashboard:
 *   get:
 *     summary: Get Users Dashboard
 *     tags: [Users API]
 */
router.get("/users/dashboard", middleware.apiAuth, users.accessDashboard);

// TODO: create permission for user:read, user:update, user:create, user:delete
// router.get("/users/get", middleware.apiAuth, users.accessDashboard);
// router.get("/users/:user_id/get", middleware.apiAuth, users.getUserInfo);
// router.patch(
// 	"/users/:user_id/update",
// 	middleware.apiAuth,
// 	users.updateUserInfo
// );

module.exports = router;
