// utils
const logger = require("../../utils/logger");

exports.up = async (knex) => {
  if (!(await knex.schema.hasTable('posts_comments'))) { // Check if table exists
    return knex.schema.createTable("posts_comments", (table) => {
      table.uuid("id").notNullable().primary();
      table.uuid("parent_id").nullable().references("id").inTable("posts_comments");
      table.uuid("activity_id").notNullable();
      table.string("body", 4000).notNullable();
      table.boolean("is_edited").defaultTo(false);
      table.boolean("is_spam").defaultTo(false);
      table.boolean("is_internal").defaultTo(false);
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    })
    .then(() => {
      logger.info({
        code: "DATABASE_MIGRATIONS",
        message: "Creating table: posts_comments",
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
    .hasTable("posts_comments")
    .then((exists) => {
      if (exists) {
        return knex.schema.dropTable("posts_comments");
      }
    })
    .then(() => {
      logger.info({
        message: "Dropping table: posts_comments",
      });
    })
    .catch((err) => {
      logger.error({
        code: "DATABASE_MIGRATIONS",
        message: err.message, // Log the actual error message for better debugging
      });
    });
};
