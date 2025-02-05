// Filename: 20240227100100_add_mvp_column_to_posts.js (use a timestamped filename)

exports.up = async (knex) => {
  try {
    const hasColumn = await knex.schema.hasColumn("posts", "mvp");
    if (!hasColumn) {
      await knex.schema.table("posts", (table) => {
        table.boolean("mvp").defaultTo(false);
      });
      console.log("mvp column added to posts table");
    } else {
      console.log("mvp column already exists in posts table");
    }
  } catch (error) {
    console.error("Error adding mvp column:", error);
    throw error; // Re-throw the error to halt the migration
  }
};

exports.down = async (knex) => {
  try {
    const hasColumn = await knex.schema.hasColumn("posts", "mvp");
    if (hasColumn) {
      await knex.schema.table("posts", (table) => {
        table.dropColumn("mvp");
      });
      console.log("mvp column removed from posts table");
    } else {
      console.log("mvp column does not exist in posts table");
    }
  } catch (error) {
    console.error("Error removing mvp column:", error);
    throw error; // Re-throw the error to halt the migration
  }
};
