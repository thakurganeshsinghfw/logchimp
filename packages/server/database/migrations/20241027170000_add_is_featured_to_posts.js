exports.up = async (knex) => {
  return knex.schema.table('posts', table => {
    table.boolean('is_featured').defaultTo(false);
  })
  .then(() => {
    console.log("Added 'is_featured' column to posts table.");
  })
  .catch(error => {
    console.error("Error adding 'is_featured' column:", error);
  });
};

exports.down = async (knex) => {
  return knex.schema.table('posts', table => {
    table.dropColumn('is_featured');
  })
  .then(() => {
    console.log("Removed 'is_featured' column from posts table.");
  })
  .catch(error => {
    console.error("Error removing 'is_featured' column:", error);
  });
};
