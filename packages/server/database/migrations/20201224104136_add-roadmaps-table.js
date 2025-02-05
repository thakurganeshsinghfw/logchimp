// utils
const logger = require("../../utils/logger");

exports.up = async (knex) => {
  if (!(await knex.schema.hasTable('roadmaps'))) { // Check if table exists
    return knex.schema.createTable("roadmaps", (table) => {
      table.uuid("id").notNullable().unique().primary();
      table.string("name", 50).notNullable();
      table.string("url", 50).notNullable().unique();
      table.integer("index").notNullable();
      table.string("color", 6).notNullable();
      table.boolean("display").defaultTo(false);
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
    })
    .then(() => {
      logger.info({
        code: "DATABASE_MIGRATIONS",
        message: "Creating table: roadmaps",
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
    .hasTable("roadmaps")
    .then((exists) => {
      if (exists) {
        return knex.schema.dropTable("roadmaps");
      }
    })
    .then(() => {
      logger.info({
        message: "Dropping table: roadmaps",
      });
    })
    .catch((err) => {
      logger.error({
        code: "DATABASE_MIGRATIONS",
        message: err.message, // Log the actual error message for better debugging
      });
    });
};
