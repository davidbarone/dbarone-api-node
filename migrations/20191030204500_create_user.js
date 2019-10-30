exports.up = function(knex) {
  return knex.schema.createTable("user", function(table) {
    table.increments("id").primary();
    table
      .string("email", 250)
      .unique()
      .notNullable();
    table.string("name", 250).notNullable();
    table.string("password", 250).notNullable();
    table.string("role", 50).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("user");
};
