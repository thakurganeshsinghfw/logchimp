exports.up = async (knex) => {
  if (!(await knex.schema.hasColumn('posts', 'created_at'))) {
    return knex.schema.table('posts', table => {
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log("Added 'created_at' column to posts table.");
    })
    .catch(error => {
      console.error("Error adding 'created_at' column:", error);
    });
  } else {
    console.warn("'created_at' column already exists in posts table. Skipping migration.");
  }
};

exports.down = async (knex) => {
  return knex.schema.table('posts', table => {
    table.dropColumn('created_at');
  })
  .then(() => {
    console.log("Removed 'created_at' column from posts table.");
  })
  .catch(error => {
    console.error("Error removing 'created_at' column:", error);
  });
};
