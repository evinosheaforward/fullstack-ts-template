exports.up = function(knex) {
  return knex.schema
    .createTable('hello_world', function(table) {
      table.text('id').primary();
      table.text('data').notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('hello_world');
};
