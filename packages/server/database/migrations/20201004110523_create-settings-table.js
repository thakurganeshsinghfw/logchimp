// utils
const logger = require("../../utils/logger");

exports.up = async (knex) => {
  if (!(await knex.schema.hasTable('settings'))) { // Check if table exists
    return knex.schema.createTable("settings", (table) => {
      table.increments('id').primary(); // Add a primary key (assuming auto-increment)
      table.string("title");
      table.string("description");
      table.string("logo");
      table.string("icon");
      table.string("accentColor", 6);
      table.string("googleAnalyticsId");
      table.boolean("isPoweredBy").defaultTo(true);
      table.boolean("allowSignup").defaultTo(true);
      table.timestamps(true, true); // Add createdAt and updatedAt columns
    })
    .then(() => {
      logger.info({
        code: "DATABASE_MIGRATIONS",
        message: "Creating table: settings",
      });
    })
    .catch((err) => {
      logger.error({
        code: "DATABASE_MIGRATIONS",
        err,
      });
    });
  }
};

exports.down = (knex) => {
  return knex.schema
    .hasTable("settings")
    .then((exists) => {
      if (exists) {
        return knex.schema.dropTable("settings");
      }
    })
    .then(() => {
      logger.info({
        code: "DATABASE_MIGRATIONS",
        message: "Dropping table: settings",
      });
    })
    .catch((err) => {
      logger.error({
        code: "DATABASE_MIGRATIONS",
        err,
      });
    });
};
