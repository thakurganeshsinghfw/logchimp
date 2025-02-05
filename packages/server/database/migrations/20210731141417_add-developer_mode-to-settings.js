// utils
const logger = require("../../utils/logger");

exports.up = async (knex) => {
  if (!(await knex.schema.hasColumn('settings', 'developer_mode'))) { // Check if column exists
    return knex.schema.table("settings", (table) => {
      table.boolean("developer_mode").defaultTo(false);
    })
    .then(() => {
      logger.info({
        code: "DATABASE_MIGRATIONS",
        message: "Adding column: developer_mode to settings",
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
      message: "'developer_mode' column already exists in settings table. Skipping migration.",
    });
  }
};

exports.down = (knex) => {
  return knex.schema.table("settings", (table) => {
    table.dropColumn("developer_mode");
  })
  .then(() => {
    logger.info({
      code: "DATABASE_MIGRATIONS",
      message: "Dropping column: developer_mode from settings",
    });
  })
  .catch((err) => {
    logger.error({
      code: "DATABASE_MIGRATIONS",
      message: err.message, // Log the actual error message for better debugging
    });
  });
};
