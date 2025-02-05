// utils
const logger = require("../../utils/logger");

exports.up = async (knex) => {
  if (!(await knex.schema.hasColumn('users', 'notes'))) { // Check if column exists
    return knex.schema.table("users", (table) => {
      table.text("notes");
    })
    .then(() => {
      logger.info({
        code: "DATABASE_MIGRATIONS",
        message: "Adding column: notes to users",
      });
    })
    .catch((err) => {
      logger.error({
        code: "DATABASE_MIGRATIONS",
        message: err.message, // Log the actual error message for better debugging
      });
    });
  } else {
    logger.warn({
      code: "DATABASE_MIGRATIONS",
      message: "'notes' column already exists in users table. Skipping migration.",
    });
  }
};

exports.down = (knex) => {
  return knex.schema.table("users", (table) => {
    table.dropColumn("notes");
  })
  .then(() => {
    logger.info({
      code: "DATABASE_MIGRATIONS",
      message: "Dropping column: notes from users",
    });
  })
  .catch((err) => {
    logger.error({
      code: "DATABASE_MIGRATIONS",
      message: err.message, // Log the actual error message for better debugging
    });
  });
};
