exports.up = function(knex) {
  return knex.schema.hasTable('post_tickets').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('post_tickets', function(table) {
        table.increments('id').primary();
        table.string('post_id').notNullable();
        table.string('ticket_id').notNullable();
        table.string('ticket_url').notNullable();
        table.timestamps(true, true);
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.hasTable('post_tickets').then(function(exists) {
    if (exists) {
      return knex.schema.dropTable('post_tickets');
    }
  });
};
