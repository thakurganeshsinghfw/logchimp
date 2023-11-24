// modules
const express = require("express");
const router = express.Router();

// controller
const roles = require("../../controllers/roles");

// middleware
const middleware = require("../../middlewares");
const roleExists = require("../../middlewares/roleExists");


/**
 * @swagger
 * tags:
 *   name: Roles API
 *   description: Roles
 */

/**
 * @swagger
 * /api/v1/roles:
 *   get:
 *     summary: Get Roles
 *     tags: [Roles API]
 */

router.get("/roles", middleware.apiAuth, roles.get);

/**
 * @swagger
 * /api/v1/roles/:id:
 *   get:
 *     summary: Get Roles by ID
 *     tags: [Roles API]
 */
router.get("/roles/:id", middleware.apiAuth, roleExists, roles.getOne);

/**
 * @swagger
 * /api/v1/roles:
 *   post:
 *     summary: Add Roles
 *     tags: [Roles API]
 */

router.post("/roles", middleware.apiAuth, roles.create);

/**
 * @swagger
 * /api/v1/roles:
 *   patch:
 *     summary: Roles
 *     tags: [Roles API]
 */

router.patch("/roles", middleware.apiAuth, roleExists, roles.update);

// BETA: Assign role to a user
// todo: add userExists middleware
// todo: add roleExists middleware
/**
 * @swagger
 * /api/v1/roles/:role_id/users/:user_id:
 *   put:
 *     summary: Update Roles for a user
 *     tags: [Roles API]
 */
router.put(
  "/roles/:role_id/users/:user_id",
  middleware.apiAuth,
  roles.addRoleToUser,
);

// BETA: Unassign role from a user
// todo: add userExists middleware
// todo: add roleExists middleware
/**
 * @swagger
 * /api/v1/roles/:role_id/users/:user_id:
 *   delete:
 *     summary: Delete Roles for a user
 *     tags: [Roles API]
 */
router.delete(
  "/roles/:role_id/users/:user_id",
  middleware.apiAuth,
  roles.deleteRoleFromUser,
);

module.exports = router;
