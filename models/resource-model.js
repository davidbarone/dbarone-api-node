const Knex = require("knex");
const connection = require("../knexfile");
const { Model } = require("objection");
const knexConnection = Knex(connection);
Model.knex(knexConnection);

// Resource model
class Resource extends Model {
  static get tableName() {
    return "resource";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "file_name",
        "media_type",
        "updated_dt",
        "updated_by",
        "updated_dt",
        "deleted"
      ],

      properties: {
        id: { type: "integer" },
        file_name: { type: "string", minLength: 1, maxLength: 250 },
        data: { type: "string" },
        media_type: { type: "string", minLength: 1, maxLength: 250 },
        updated_dt: { type: "string", format: "date-time" },
        updated_by: { type: "string", minLength: 1, maxLength: 250 },
        deleted: { type: "boolean" }
      }
    };
  }
}

module.exports = Resource;
