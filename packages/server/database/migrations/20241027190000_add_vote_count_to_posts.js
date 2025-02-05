exports.up = async (knex) => {
  if (!(await knex.schema.hasColumn('posts', 'vote_count'))) {
    return knex.schema.table('posts', table => {
      table.integer('vote_count').defaultTo(0);
    })
    .then(() => {
      console.log("Added 'vote_count' column to posts table.");
    })
    .catch(error => {
      console.error("Error adding 'vote_count' column:", error);
    });
  } else {
    console.warn("'vote_count' column already exists in posts table. Skipping migration.");
  }
};

exports.down = async (knex) => {
  return knex.schema.table('posts', table => {
    table.dropColumn('vote_count');
  })
  .then(() => {
    console.log("Removed 'vote_count' column from posts table.");
  })
  .catch(error => {
    console.error("Error removing 'vote_count' column:", error);
  });
};
