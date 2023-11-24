const database = require("../../database");
const logger = require("../../utils/logger");
const error = require("../../errorResponse.json");

module.exports = async (req, res) => {
  const { created, page = 1, limit = 10, sort = 'DESC' } = req.query;

  try {
    const sortOrder = sort.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const boards = await database
      .select(
        "boards.boardId",
        "boards.name",
        "boards.color",
        "boards.url",
        "boards.display",
      )
      .count("posts", { as: "post_count" })
      .from("boards")
      .leftJoin("posts", "boards.boardId", "posts.boardId")
      .groupBy("boards.boardId")
      .orderBy("boards.createdAt", sortOrder)
      .limit(limit)
      .offset(limit * (page - 1));

    res.status(200).send({ boards });
  } catch (err) {
    logger.error({
      message: err,
    });

    res.status(500).send({
      message: error.general.serverError,
      code: "SERVER_ERROR",
    });
  }
};
