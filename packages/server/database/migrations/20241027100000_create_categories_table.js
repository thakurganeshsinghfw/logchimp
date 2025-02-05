// utils
const logger = require("../../utils/logger");

exports.up = async (knex) => {
  if (!(await knex.schema.hasTable('categories'))) {  // Check if the table exists
    return knex.schema.createTable('categories', table => {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.timestamps(true, true);
    })
    .then(() => {
      logger.info({
        code: "DATABASE_MIGRATIONS",
        message: "Creating table: categories",
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
      message: "Table 'categories' already exists. Skipping migration."
    });
  }
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('categories')
    .then(() => {
      logger.info({
        code: "DATABASE_MIGRATIONS",
        message: "Dropping table: categories",
      });
    })
    .catch((err) => {
      logger.error({
        code: "DATABASE_MIGRATIONS",
        message: err.message,
      });
    });
};
