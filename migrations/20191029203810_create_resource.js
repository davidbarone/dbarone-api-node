exports.up = function(knex) {
  return knex.schema.createTable("resource", function(table) {
    table.increments("id").primary();
    table
      .string("file_name", 250)
      .unique()
      .notNullable();
    table.binary("data").notNullable();
    table.string("media_type", 250).notNullable();
    table.boolean("deleted");
    table
      .timestamp("updated_dt")
      .defaultTo(knex.fn.now())
      .notNullable();
    table.string("updated_by");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("resource");
};
