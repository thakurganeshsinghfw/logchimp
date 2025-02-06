const express = require('express');
const router = express.Router();
const ticketController = require('../../controllers/ticketController');

/**
 * @swagger
 * tags:
 *   name: Tickets API
 *   description: API for managing support tickets
 */

/**
 * @swagger
 * /api/v1/tickets/{postId}:
 *   get:
 *     summary: Get ticket details by post ID
 *     tags: [Tickets API]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: Ticket details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticketId:
 *                   type: string
 *                   description: The ID of the ticket
 *                 ticketUrl:
 *                   type: string
 *                   description: The URL of the ticket
 *       404:
 *         description: No ticket found for this post
 *       500:
 *         description: An error occurred while fetching the ticket details
 */
router.get('/tickets/:postId', ticketController.getTicketDetails);

/**
 * @swagger
 * /api/v1/tickets:
 *   post:
 *     summary: Create a new support ticket
 *     tags: [Tickets API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *                 description: The ID of the post
 *               title:
 *                 type: string
 *                 description: The title of the post
 *               description:
 *                 type: string
 *                 description: The description of the post
 *               email:
 *                 type: string
 *                 description: The email of the user
 *     responses:
 *       201:
 *         description: L2 Ticket created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticketId:
 *                   type: string
 *                   description: The ID of the created ticket
 *                 ticketUrl:
 *                   type: string
 *                   description: The URL of the created ticket
 *       500:
 *         description: An error occurred while creating the L2 Ticket
 */

router.post('/tickets', ticketController.createTicket);

/**
 * @swagger
 * /api/v1/tickets/status/{ticketId}:
 *   get:
 *     summary: Get ticket status by ticket ID
 *     tags: [Tickets API]
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the ticket
 *     responses:
 *       200:
 *         description: Ticket status details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticketId:
 *                   type: string
 *                   description: The ID of the ticket
 *                 status:
 *                   type: integer
 *                   description: The numeric status of the ticket
 *                 statusMeaning:
 *                   type: string
 *                   description: The human-readable status of the ticket
 *                 priority:
 *                   type: integer
 *                   description: The numeric priority of the ticket
 *                 priorityMeaning:
 *                   type: string
 *                   description: The human-readable priority of the ticket
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Ticket creation timestamp
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Ticket last updated timestamp
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: An error occurred while fetching the ticket status
 */
router.get('/tickets/status/:ticketId', ticketController.getTicketStatus);


// Create Freshrelease story
/**
 * @swagger
 * /api/v1/tickets/freshrelease:
 *   post:
 *     summary: Create a Freshrelease story
 *     tags: [Tickets API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *                 description: The ID of the post to create the story for
 *               title:
 *                 type: string
 *                 description: The title of the Freshrelease story
 *               description:
 *                 type: string
 *                 description: A description of the Freshrelease story
 *               priority:
 *                 type: string
 *                 enum: [Low, Medium, High]
 *                 description: The priority level of the story
 *               status:
 *                 type: string
 *                 enum: [Open, In Progress, Closed]
 *                 description: The status of the story
 *     responses:
 *       201:
 *         description: Freshrelease story created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 storyId:
 *                   type: integer
 *                   description: The Freshrelease story ID
 *                 storyUrl:
 *                   type: string
 *                   description: The URL of the Freshrelease story
 *       400:
 *         description: Story already exists for this post
 *       500:
 *         description: Failed to create Freshrelease story
 *       502:
 *         description: Bad response from Freshrelease API
 */
router.post('/tickets/freshrelease', ticketController.createFreshreleaseStory);

module.exports = router;
