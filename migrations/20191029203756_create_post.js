exports.up = function(knex) {
  return knex.schema.createTable("post", function(table) {
    table.increments("id").primary();
    table
      .string("title", 250)
      .unique()
      .notNullable();
    table.string("teaser", 1000).notNullable();
    table.text("content");
    table.text("code");
    table.text("style");
    table.text("head");
    table.string("post_type", 20).notNullable();
    table
      .integer("parent_id")
      .references("id")
      .inTable("post");
    table
      .timestamp("updated_dt")
      .defaultTo(knex.fn.now())
      .notNullable();
    table.string("updated_by", 250).notNullable();
    table
      .string("published_dt")
      .defaultTo(knex.fn.now())
      .notNullable();
    table.boolean("deleted").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("post");
};
