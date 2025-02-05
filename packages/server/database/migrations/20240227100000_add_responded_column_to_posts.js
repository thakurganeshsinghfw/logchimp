exports.up = async (knex) => {
  try {
    const hasColumn = await knex.schema.hasColumn("posts", "responded");
    if (!hasColumn) {
      await knex.schema.table("posts", (table) => {
        table.boolean("responded").defaultTo(false);
      });
      console.log("responded column added to posts table");
    } else {
      console.log("responded column already exists in posts table");
    }
  } catch (error) {
    console.error("Error adding responded column:", error);
    throw error; // Re-throw the error to halt the migration process
  }
};

exports.down = async (knex) => {
  try {
    const hasColumn = await knex.schema.hasColumn("posts", "responded");
    if (hasColumn) {
      await knex.schema.table("posts", (table) => {
        table.dropColumn("responded");
      });
      console.log("responded column removed from posts table");
    } else {
      console.log("responded column does not exist in posts table");
    }
  } catch (error) {
    console.error("Error removing responded column:", error);
    throw error; // Re-throw the error to halt the migration process.
  }
};
