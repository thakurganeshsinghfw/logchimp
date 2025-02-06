const database = require("../../database");

// services
const getVotes = require("../../services/votes/getVotes");

// utils
const { validUUID } = require("../../helpers");
const logger = require("../../utils/logger");
const error = require("../../errorResponse.json");

const getPostBySlug = async (req, res) => {
  const { slug } = req.body;

  try {
    const post = await database.raw(
      `
        SELECT
          p."postId",
          p."title",
          p."slug",
          p."boardId",
          p."roadmap_id",
          p."contentMarkdown",
          p."createdAt",
          p."status",
          b."name" as "boardName",
          b."url" as "boardUrl",
          b."color" as "boardColor",
          r."name" as "roadmapName",
          r."url" as "roadmapUrl",
          r."color" as "roadmapColor",
          u."userId",
          u."name" as "authorName",
          u."username" as "authorUsername",
          u."avatar" as "authorAvatar"
        FROM
          posts p
        LEFT JOIN
          boards b ON p."boardId" = b."boardId"
        LEFT JOIN
          roadmaps r ON p."roadmap_id" = r."id"
        LEFT JOIN
          users u ON p."userId" = u."userId"
        WHERE
          p."slug" = ?
      `,
      [slug]
    );

    if (post.rows.length === 0) {
      return res.status(404).send({
        message: error.general.notFound,
        code: "NOT_FOUND",
      });
    }

    const postId = post.rows[0].postId;

    const votes = await database.raw(
      `
        SELECT
          v."voteId",
          v."userId",
          v."postId",
          v."createdAt",
          u."name",
          u."username",
          u."avatar"
        FROM
          votes v
        LEFT JOIN
          users u ON v."userId" = u."userId"
        WHERE
          v."postId" = ?
      `,
      [postId]
    );

    res.status(200).send({
      post: {
        ...post.rows[0],
        board: {
          boardId: post.rows[0].boardId,
          name: post.rows[0].boardName,
          url: post.rows[0].boardUrl,
          color: post.rows[0].boardColor,
        },
        roadmap: {
          id: post.rows[0].roadmap_id,
          name: post.rows[0].roadmapName,
          url: post.rows[0].roadmapUrl,
          color: post.rows[0].roadmapColor,
        },
        author: {
          userId: post.rows[0].userId,
          name: post.rows[0].authorName,
          username: post.rows[0].authorUsername,
          avatar: post.rows[0].authorAvatar,
        },
        voters: {
          votes: votes.rows,
          votesCount: votes.rows.length,
          viewerVote: votes.rows.some(vote => vote.userId === req.userId),
        },
      },
    });
  } catch (err) {
    console.error("Error fetching post by slug:", err);
    res.status(500).send({
      message: error.general.serverError,
      code: "SERVER_ERROR",
    });
  }
};

module.exports = getPostBySlug;
