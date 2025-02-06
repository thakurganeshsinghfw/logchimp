const database = require("../../database");

exports.searchPosts = async (req, res) => {
  const { q, board, roadmap } = req.query;

  try {
    let query = `
      SELECT
        p."postId",
        p."title",
        p."slug",
        p."contentMarkdown",
        p."createdAt",
        p."updatedAt",
        p."status"
      FROM
        posts p
    `;

    const conditions = [];
    const values = [];

    if (q) {
      conditions.push(`p."title" ILIKE ? OR p."contentMarkdown" ILIKE ?`);
      values.push(`%${q}%`, `%${q}%`);
    }

    if (board) {
      conditions.push(`p."boardId" = ?`);
      values.push(board);
    }

    if (roadmap) {
      conditions.push(`p."roadmap_id" = ?`);
      values.push(roadmap);
    }

    if (conditions.length > 0) {
      query +=  ` WHERE ${conditions.join(" AND ")}`;
    }

    query += ` ORDER BY p."createdAt" DESC`;

    const posts = await database.raw(query, values);

    res.status(200).send({
      posts: posts.rows,
    });
  } catch (err) {
    console.error("Error searching posts:", err);
    res.status(500).send({
      message: "Failed to search posts. Please try again.",
    });
  }
};
