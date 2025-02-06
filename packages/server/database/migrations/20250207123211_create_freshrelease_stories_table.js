exports.up = function(knex) {
  return knex.schema.hasTable('freshrelease_stories').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('freshrelease_stories', function(table) {
        table.increments('id').primary(); // Auto-incrementing primary key
        table.string('post_id').notNullable().unique(); // Unique post_id to avoid duplicates
        table.integer('story_id').notNullable(); // Freshrelease story ID
        table.string('story_url').notNullable(); // URL of the story
        table.string('title').notNullable(); // Title of the story
        table.text('description').notNullable(); // Description of the story
        table.string('priority').defaultTo('Medium'); // Priority with default value
        table.string('status').defaultTo('Open'); // Status with default value
        table.timestamps(true, true); // Timestamps for created_at and updated_at
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.hasTable('freshrelease_stories').then(function(exists) {
    if (exists) {
      return knex.schema.dropTable('freshrelease_stories');
    }
  });
};
