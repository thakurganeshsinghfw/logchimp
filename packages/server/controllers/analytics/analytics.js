const database = require("../../database");
const logger = require("../../utils/logger");
const error = require("../../errorResponse.json");

module.exports = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const dateFilter = startDate && endDate ? `createdAt BETWEEN '${startDate}' AND '${endDate}'` : '1=1';

    const totalPostsResult = await database.raw(`SELECT COUNT(*) AS total FROM posts WHERE ${dateFilter}`);
    const totalPosts = totalPostsResult.rows[0].total;

    const totalUpvotesResult = await database.raw(`SELECT COUNT(*) AS upvotes FROM votes WHERE ${dateFilter}`);
    const totalUpvotes = totalUpvotesResult.rows[0].upvotes;

    const totalCommentsResult = await database.raw(`SELECT COUNT(*) AS comments FROM posts_comments WHERE ${dateFilter}`);
    const totalComments = totalCommentsResult.rows[0].comments;

    const resolvedPostsResult = await database.raw(`SELECT COUNT(*) AS resolved FROM posts WHERE ${dateFilter} AND status = 'resolved'`);
    const resolvedPosts = resolvedPostsResult.rows[0].resolved;

    const respondedPostsResult = await database.raw(`SELECT COUNT(*) AS responded FROM posts WHERE ${dateFilter} AND responded = true`);
    const respondedPosts = respondedPostsResult.rows[0].responded;

    const mvpPostsResult = await database.raw(`SELECT COUNT(*) AS mvp FROM posts WHERE ${dateFilter} AND mvp = true`);
    const mvpPosts = mvpPostsResult.rows[0].mvp;

    const engagementRate = totalPosts > 0 ? ((((totalUpvotes + totalComments)) / totalPosts) * 100).toFixed(2) : 0;
    const resolutionRate = totalPosts > 0 ? ((resolvedPosts / totalPosts) * 100).toFixed(2) : 0;
    const responseRate = totalPosts > 0 ? ((respondedPosts / totalPosts) * 100).toFixed(2) : 0;
    const mvpInteractionRate = totalPosts > 0 ? ((mvpPosts / totalPosts) * 100).toFixed(2) : 0;

    res.json({
      engagementRate,
      resolutionRate,
      responseRate,
      mvpInteractionRate,
      totalUpvotes,
      totalComments,
      resolvedPosts,
      respondedPosts,
      mvpPosts,
      totalPosts
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json(error);
  }
};
