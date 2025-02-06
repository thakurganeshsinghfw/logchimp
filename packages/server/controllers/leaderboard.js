const db = require("../database");

const getLeaderboard = async (req, res) => {
  const { metric = 'posts', limit = 10 } = req.query;

  try {
    const query = db('users')
      .select(
        'users.userId AS id',
        'users.name',
        'users.avatar AS avatarUrl',
        db.raw('COUNT(DISTINCT posts."postId") AS posts'),
        db.raw('COUNT(DISTINCT posts_comments.id) AS comments'),
        db.raw('COUNT(DISTINCT posts_activity.id) AS activities'),
        db.raw('COUNT(DISTINCT votes."userId") AS votes')
      )
      .leftJoin('posts', 'posts.userId', 'users.userId')
      .leftJoin('posts_activity', 'posts_activity.author_id', 'users.userId')
      .leftJoin('posts_comments', 'posts_activity.posts_comments_id', 'posts_comments.id')
      .leftJoin('votes', 'votes.userId', 'users.userId')
      .groupBy('users.userId')
      .orderBy(metric, 'desc')
      .limit(Number(limit));

    // console.log("SQL Query (leaderboard):", query.toSQL().sql); // Log the SQL query
    const contributors = await query;
    // console.log("Leaderboard Contributors:", contributors); // Log the results
    res.json(contributors);
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard data" });
  }
};

module.exports = getLeaderboard;
