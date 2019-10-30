const jwt = require("jsonwebtoken");
const Knex = require("knex");
const connection = require("../knexfile");
const { Model } = require("objection");
const knexConnection = Knex(connection);
Model.knex(knexConnection);

// Post model
class User extends Model {
  static get tableName() {
    return "user";
  }

  // Generates AUTH token
  generateAuthToken = () => {
    try {
      const token = jwt.sign(
        { id: this.id, role: this.role },
        process.env.APP_SECRET_KEY
      );
      return token;
    } catch (err) {
      throw new Error(err);
    }
  };

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "name", "password", "role"],

      properties: {
        id: { type: "integer" },
        email: { type: "string", minLength: 1, maxLength: 250 },
        name: { type: "string", minLength: 1, maxLength: 250 },
        password: { type: "string", minLength: 1, maxLength: 250 },
        role: { type: "string", minLength: 1, maxLength: 50 }
      }
    };
  }
}

module.exports = User;
