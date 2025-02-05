// utils
const logger = require("../../utils/logger");

exports.up = async (knex) => {
  if (!(await knex.schema.hasColumn('posts', 'roadmap_id'))) { // Check if column exists
    return knex.schema.table("posts", (table) => {
      table
        .uuid("roadmap_id")
        .references("id")
        .inTable("roadmaps")
        .onDelete("set null");
    })
    .then(() => {
      logger.info({
        code: "DATABASE_MIGRATIONS",
        message: "Adding column: roadmap_id in posts",
      });
    })
    .catch((err) => {
      logger.error({
        code: "DATABASE_MIGRATIONS",
        message: err.message, // Log the actual error message for better debugging
      });
    });
  }
};

exports.down = (knex) => {
  return knex.schema
    .hasColumn("posts", "roadmap_id")
    .then((exists) => {
      if (exists) {
        return knex.schema.table("posts", (table) => {
          table.dropColumn("roadmap_id");
        });
      }
    })
    .then(() => {
      logger.info({
        message: "Dropping column: roadmap_id in posts",
      });
    })
    .catch((err) => {
      logger.error({
        code: "DATABASE_MIGRATIONS",
        message: err.message, // Log the actual error message for better debugging
      });
    });
};
