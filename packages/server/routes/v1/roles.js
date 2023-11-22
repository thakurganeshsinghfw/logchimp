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
 *   name: Roles
 *   description: Roles
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get Roles
 *     tags: [Roles]
 */

router.get("/roles", middleware.apiAuth, roles.get);

/**
 * @swagger
 * /roles/:id:
 *   get:
 *     summary: Get Roles by ID
 *     tags: [Roles]
 */
router.get("/roles/:id", middleware.apiAuth, roleExists, roles.getOne);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Add Roles
 *     tags: [Roles]
 */

router.post("/roles", middleware.apiAuth, roles.create);

/**
 * @swagger
 * /roles:
 *   patch:
 *     summary: Roles
 *     tags: [Roles]
 */

router.patch("/roles", middleware.apiAuth, roleExists, roles.update);

// BETA: Assign role to a user
// todo: add userExists middleware
// todo: add roleExists middleware
/**
 * @swagger
 * /roles/:role_id/users/:user_id:
 *   put:
 *     summary: Update Roles for a user
 *     tags: [Roles]
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
 * /roles/:role_id/users/:user_id:
 *   delete:
 *     summary: Delete Roles for a user
 *     tags: [Roles]
 */
router.delete(
  "/roles/:role_id/users/:user_id",
  middleware.apiAuth,
  roles.deleteRoleFromUser,
);

module.exports = router;
