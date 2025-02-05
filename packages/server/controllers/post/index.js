const create = require("./create");
const filterPost = require("./filterPost");
const postBySlug = require("./postBySlug");
const updatePost = require("./updatePost");
const deleteById = require("./deleteById");
const activity = require("./activity");
const comments = require("./comments");
const db = require('../../database');

const getFeaturedPosts = async (req, res) => {
  try {
    const query = db('posts')
      .where('is_featured', true)
      .orderBy('created_at', 'desc')
      .limit(5);
    console.log("SQL Query (featured):", query.toSQL().sql); // Log the SQL query
    const featuredPosts = await query;
    console.log("Featured Posts:", featuredPosts); // Log the results
    res.json(featuredPosts);
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    res.status(500).json({ error: "Failed to fetch featured posts" });
  }
};

const getTrendingPosts = async (req, res) => {
  try {
    const query = db('posts')
      .orderBy('vote_count', 'desc')
      .limit(5);
    console.log("SQL Query (trending):", query.toSQL().sql); // Log the SQL query
    const trendingPosts = await query;
    console.log("Trending Posts:", trendingPosts); // Log the results
    res.json(trendingPosts);
  } catch (error) {
    console.error("Error fetching trending posts:", error);
    res.status(500).json({ error: "Failed to fetch trending posts" });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const query = db('categories').select('*');
    console.log("SQL Query (categories):", query.toSQL().sql); // Log the SQL query
    const categories = await query;
    console.log("Categories:", categories); // Log the results
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

module.exports = {
  ...create,
  ...filterPost,
  ...postBySlug,
  ...updatePost,
  ...deleteById,
  activity,
  comments,
  getFeaturedPosts,
  getTrendingPosts,
  getAllCategories,
};
