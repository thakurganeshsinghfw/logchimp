// utils
const logger = require("../../utils/logger");

exports.up = async (knex) => {
  if (!(await knex.schema.hasTable('posts_activity'))) { // Check if table exists
    return knex.schema.createTable("posts_activity", (table) => {
      table.uuid("id").primary();
      table.uuid("post_id").notNullable().references("postId").inTable("posts").onDelete("cascade");
      table.uuid("user_id").notNullable().references("userId").inTable("users");
      table.string("type", 50).notNullable();
      table.jsonb("data").nullable();
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    })
    .then(() => {
      logger.info({
        code: "DATABASE_MIGRATIONS",
        message: "Creating table: posts_activity",
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
    .hasTable("posts_activity")
    .then((exists) => {
      if (exists) {
        return knex.schema.dropTable("posts_activity");
      }
    })
    .then(() => {
      logger.info({
        message: "Dropping table: posts_activity",
      });
    })
    .catch((err) => {
      logger.error({
        code: "DATABASE_MIGRATIONS",
        message: err.message, // Log the actual error message for better debugging
      });
    });
};
