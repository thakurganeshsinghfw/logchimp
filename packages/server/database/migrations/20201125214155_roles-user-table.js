// utils
const logger = require("../../utils/logger");

exports.up = async (knex) => {
  if (!(await knex.schema.hasTable('roles_users'))) { // Check if table exists
    return knex.schema.createTable("roles_users", (table) => {
      table.uuid("id").notNullable().primary(); // Use primary key instead of unique
      table
        .uuid("role_id")
        .notNullable()
        .references("id")
        .inTable("roles")
        .onDelete("cascade");
      table
        .uuid("user_id")
        .notNullable()
        .references("userId")
        .inTable("users")
        .onDelete("cascade");
      table.unique(["role_id", "user_id"]); // Enforce uniqueness on the combination of role_id and user_id
    })
    .then(() => {
      logger.info({
        code: "DATABASE_MIGRATIONS",
        message: "Creating table: roles_users",
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
    .hasTable("roles_users")
    .then((exists) => {
      if (exists) {
        return knex.schema.dropTable("roles_users");
      }
    })
    .then(() => {
      logger.info({
        message: "Dropping table: roles_users",
      });
    })
    .catch((err) => {
      logger.error({
        code: "DATABASE_MIGRATIONS",
        message: err.message, // Log the actual error message
      });
    });
};
