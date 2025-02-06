const knex = require('../database');
const axios = require('axios');
const config = require('../config/config');

exports.getTicketDetails = async (req, res) => {
  const { postId } = req.params;

  try {
    const ticket = await knex('post_tickets').where({ post_id: postId }).first();
    if (ticket) {
      res.status(200).json({
        ticketId: ticket.ticket_id,
        ticketUrl: ticket.ticket_url
      });
    } else {
      res.status(404).json({ message: 'No ticket found for this post.' });
    }
  } catch (error) {
    console.error('Error fetching ticket details:', error);
    res.status(500).json({ message: 'An error occurred while fetching the ticket details.' });
  }
};

exports.createTicket = async (req, res) => {
  const { postId, title, description, email } = req.body;

  try {
    const existingTicket = await knex('post_tickets').where({ post_id: postId }).first();
    if (existingTicket) {
      return res.status(200).json({
        ticketId: existingTicket.ticket_id,
        ticketUrl: existingTicket.ticket_url
      });
    }

    const response = await axios.post(`https://${config.freshdesk.domain}/api/v2/tickets`, {
      subject: title,
      description: description,
      email: email,
      priority: 2,
      status: 2
    }, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${config.freshdesk.apiKey}:x`).toString('base64')}`
      }
    });

    if (response.status === 201) {
      const ticketId = response.data.id;
      const ticketUrl = `https://${config.freshdesk.domain}/helpdesk/tickets/${ticketId}`;

      await knex('post_tickets').insert({
        post_id: postId,
        ticket_id: ticketId,
        ticket_url: ticketUrl
      });

      res.status(201).json({ ticketId, ticketUrl });
    } else {
      res.status(500).json({ message: 'Failed to create L2 Ticket.' });
    }
  } catch (error) {
    console.error('Error creating L2 Ticket:', error);
    res.status(500).json({ message: 'An error occurred while creating the L2 Ticket.' });
  }
};

// New function to get ticket status
exports.getTicketStatus = async (req, res) => {
  const { ticketId } = req.params;

  try {
    // Step 1: Fetch ticket details
    const ticketResponse = await axios.get(`https://${config.freshdesk.domain}/api/v2/tickets/${ticketId}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${config.freshdesk.apiKey}:x`).toString('base64')}`
      }
    });

    if (ticketResponse.status !== 200) {
      return res.status(404).json({ message: 'Ticket not found.' });
    }

    const { id, status, priority, created_at, updated_at } = ticketResponse.data;

    // Step 2: Fetch ticket field metadata (status & priority meanings)
    const fieldsResponse = await axios.get(`https://${config.freshdesk.domain}/api/v2/ticket_fields`, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${config.freshdesk.apiKey}:x`).toString('base64')}`
      }
    });

    if (fieldsResponse.status !== 200) {
      return res.status(500).json({ message: 'Failed to fetch ticket field metadata.' });
    }

    const fields = fieldsResponse.data;

    let statusMeaning = "Unknown";
    let priorityMeaning = "Unknown";

    // Ensure we only set the value once
    for (const field of fields) {
      if (field.name === "status" && field.choices && statusMeaning === "Unknown") {
        statusMeaning = field.choices[status] || "Unknown";
      }
      if (field.name === "priority" && field.choices && priorityMeaning === "Unknown") {
        priorityMeaning = field.choices[priority] || "Unknown";
      }
    }

    // Step 3: Return formatted response
    res.status(200).json({
      ticketId: id,
      status: status,
      statusMeaning: statusMeaning,
      priority: priority,
      priorityMeaning: priorityMeaning,
      createdAt: created_at,
      updatedAt: updated_at
    });

  } catch (error) {
    console.error('Error fetching ticket status:', error);
    res.status(500).json({ message: 'An error occurred while fetching the ticket status.' });
  }
};


/**
 * Create a Freshrelease story and save its details to the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.createFreshreleaseStory = async () => {
  try {
    const response = await axios.post(
      `https://${config.freshrelease.domain}/api/v2/projects/${config.freshrelease.workspace_id}/issues`,
      {
        title: postData.title,
        description: postData.contentMarkdown,
        issue_type_id: 14, // Example issue type
        status_id: 278, // Example status ID
        priority_id: 6, // Example priority ID
        sub_project_id: 35879, // Example sub-project ID
        tags: ["Q1-2024", "Q2-2024"], // Example tags
        custom_field: {} // Example custom field
      },
      {
        headers: {
          Authorization: `Bearer ${config.freshrelease.apiKey}`,
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.status === 201) {
      freshreleaseTicketDetails.value = {
        id: response.data.ticketId
      };
      alert('Freshrelease issue created successfully!');
    } else {
      alert('Failed to create Freshrelease issue.');
    }
  } catch (error) {
    console.error('Error creating Freshrelease issue:', error);
    alert('An error occurred while creating the Freshrelease issue.');
  }
};

