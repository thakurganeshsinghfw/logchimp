const { v4: uuid } = require("uuid");

const database = require("../../../database");

// utils
const logger = require("../../../utils/logger");
const error = require("../../../errorResponse.json");
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

// Create DOMPurify instance
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

// ... (other imports) ...

module.exports = async (req, res) => {
  const userId = req.user.userId; // Assuming req.user.userId is always defined; if not add checks
  const { post_id } = req.params;
  const { parent_id, is_internal, body } = req.body;

  // Input validation: Check for undefined or null values
  if (!userId || !post_id || !body) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sanitizedBody = DOMPurify.sanitize(body);

  try {
    const labSettings = await database
      .select(database.raw("labs::json"))
      .from("settings")
      .first();

    if (!labSettings?.labs?.comments) { // Use optional chaining
      return res.status(403).send({ message: error.api.labs.disabled, code: "LABS_DISABLED" });
    }

    const results = await database.transaction(async (trx) => {
      const postActivityId = uuid();
      const commentId = uuid(); // Generate UUID for comment

      const [comment] = await trx("posts_comments").insert({
        id: commentId,
        parent_id,
        body: sanitizedBody,
        activity_id: postActivityId,
        is_internal,
        created_at: new Date().toJSON(),
        updated_at: new Date().toJSON(),
      }, ["id", "parent_id", "body", "is_internal", "is_edited", "is_spam", "created_at"]);

      const [activity] = await trx("posts_activity").insert({
        id: postActivityId,
        type: "comment",
        posts_comments_id: commentId, // Use generated commentId
        post_id: post_id,
        author_id: userId, // Use userId from req.user
        created_at: new Date().toJSON(),
      }).returning(["id", "type", "created_at"]);


      const author = await trx("users")
        .select("userId", "name", "username", "avatar")
        .where({ userId })
        .first();

      return { ...activity, comment, author };
    });

    res.status(201).send({ comment: results });
  } catch (err) {
    logger.error("Error creating comment:", err); // Log the error for debugging
    res.status(500).send({ message: error.general.serverError, code: "SERVER_ERROR" });
  }
};
