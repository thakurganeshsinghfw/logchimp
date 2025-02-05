// utils
const logger = require("../../utils/logger");

exports.up = async (knex) => {
  if (!(await knex.schema.hasTable('permissions_roles'))) { // Check if table exists
    return knex.schema.createTable("permissions_roles", (table) => {
      table.uuid("id").primary(); // Use a primary key instead of unique
      table
        .uuid("permission_id")
        .notNullable()
        .references("id")
        .inTable("permissions")
        .onDelete("cascade");
      table
        .uuid("role_id")
        .notNullable()
        .references("id")
        .inTable("roles")
        .onDelete("cascade");
      table.unique(["permission_id", "role_id"]); // Enforce uniqueness
    })
    .then(() => {
      logger.info({
        code: "DATABASE_MIGRATIONS",
        message: "Creating table: permissions_roles",
      });
    })
    .catch((err) => {
      logger.error({
        code: "DATABASE_MIGRATIONS",
        message: err.message, // Log the actual error message
      });
    });
  }
};

exports.down = (knex) => {
  return knex.schema
    .hasTable("permissions_roles")
    .then((exists) => {
      if (exists) {
        return knex.schema.dropTable("permissions_roles");
      }
    })
    .then(() => {
      logger.info({
        message: "Dropping table: permissions_roles",
      });
    })
    .catch((err) => {
      logger.error({
        code: "DATABASE_MIGRATIONS",
        message: err.message, // Log the actual error message
      });
    });
};
