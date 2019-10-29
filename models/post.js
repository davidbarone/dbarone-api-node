const Knex = require("knex");
const connection = require("../knexfile");
const { Model } = require("objection");
const knexConnection = Knex(connection);
Model.knex(knexConnection);

// Post model
class Post extends Model {
  static get tableName() {
    return "post";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "teaser",
        "post_type",
        "updated_dt",
        "updated_by",
        "published_dt",
        "deleted"
      ],

      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 250 },
        teaser: { type: "string", minLength: 1, maxLength: 1000 },
        content: { type: "string" },
        code: { type: "string" },
        style: { type: "string" },
        head: { type: "string" },
        post_type: { type: "string", minLength: 1, maxLength: 20 },
        parent_id: { type: ["integer", "null"] },
        updated_dt: { type: "string", format: "date-time" },
        updated_by: { type: "string", minLength: 1, maxLength: 250 },
        published_dt: { type: "string", format: "date-time" },
        deleted: { type: "boolean" }
      }
    };
  }
}

module.exports = Post;
