// utils
const logger = require("../../utils/logger");

exports.up = async (knex) => {
  if (!(await knex.schema.hasColumn('settings', 'labs'))) { // Check if column exists
    return knex.schema
      .table("settings", (table) => {
        table.text("labs").defaultTo("{}");
      })
      .then(() => {
        logger.info({
          code: "DATABASE_MIGRATIONS",
          message: "Adding column 'labs' to settings",
        });
        return knex("settings").update({
          labs: knex.raw("labs::jsonb || '{\"comments\": false}'"),
        });
      })
      .then(() => {
        logger.info({
          code: "DATABASE_MIGRATIONS",
          message: "Inserting data into 'labs' column",
        });
      })
      .catch((err) => {
        logger.error({
          code: "DATABASE_MIGRATIONS",
          message: err.message,
        });
      });
  } else {
    logger.warn({
      code: "DATABASE_MIGRATIONS",
      message: "'labs' column already exists in settings table. Skipping migration.",
    });
  }
};

exports.down = (knex) => {
  return knex.schema
    .hasColumn("settings", "labs")
    .then((exists) => {
      if (exists) {
        return knex.schema.table("settings", (table) => {
          table.dropColumn("labs");
        });
      }
    })
    .then(() => {
      logger.info({
        message: "Dropping column 'labs' from settings",
      });
    })
    .catch((err) => {
      logger.error({
        code: "DATABASE_MIGRATIONS",
        message: err.message,
      });
    });
};

