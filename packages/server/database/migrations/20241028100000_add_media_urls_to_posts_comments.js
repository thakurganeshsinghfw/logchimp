exports.up = async (knex) => {
  const imageUrlsExists = await knex.schema.hasColumn('posts_comments', 'imageUrls');
  const videoUrlsExists = await knex.schema.hasColumn('posts_comments', 'videoUrls');

  if (!imageUrlsExists || !videoUrlsExists) {
    return knex.schema.table('posts_comments', table => {
      if (!imageUrlsExists) table.jsonb('imageUrls').nullable();
      if (!videoUrlsExists) table.jsonb('videoUrls').nullable();
    })
    .then(() => {
      console.log("Added 'imageUrls' and 'videoUrls' columns to posts_comments table.");
    })
    .catch(error => {
      console.error("Error adding columns:", error);
    });
  } else {
    console.warn("'imageUrls' and 'videoUrls' columns already exist in posts_comments table. Skipping migration.");
  }
};

exports.down = async (knex) => {
  return knex.schema.table('posts_comments', table => {
    table.dropColumn('imageUrls');
    table.dropColumn('videoUrls');
  })
  .then(() => {
    console.log("Removed 'imageUrls' and 'videoUrls' columns from posts_comments table.");
  })
  .catch(error => {
    console.error("Error removing columns:", error);
  });
};
