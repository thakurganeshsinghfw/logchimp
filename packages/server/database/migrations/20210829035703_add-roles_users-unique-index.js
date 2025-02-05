// utils
const logger = require("../../utils/logger");

exports.up = async (knex) => {
  try {
    const indexExistsResult = await knex.raw(`
      SELECT EXISTS (
        SELECT 1
        FROM pg_class
        WHERE relname = 'role_id_user_id_unique_index'
          AND relkind = 'i' -- index
      );
    `);
    const indexExists = indexExistsResult.rows[0].exists;

    if (!indexExists) {
      await knex.raw(
        `
          CREATE UNIQUE INDEX "role_id_user_id_unique_index" ON "roles_users" ("role_id", "user_id");
        `
      );
      logger.info({
        code: "DATABASE_MIGRATIONS",
        message: "Creating index: role_id_user_id_unique_index",
      });
    } else {
      logger.warn({
        code: "DATABASE_MIGRATIONS",
        message: "Index 'role_id_user_id_unique_index' already exists on roles_users table. Skipping migration.",
      });
    }
  } catch (error) {
    logger.error({
      code: "DATABASE_MIGRATIONS",
      message: `Error during migration: ${error.message}`,
    });
  }
};

exports.down = (knex) => {
  return knex.raw("DROP INDEX IF EXISTS role_id_user_id_unique_index;")
    .then(() => {
      logger.info({
        message: "Dropping index: role_id_user_id_unique_index",
      });
    })
    .catch((err) => {
      logger.error({
        code: "DATABASE_MIGRATIONS",
        message: err.message,
      });
    });
};
