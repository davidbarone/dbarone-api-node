const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

class UserController {
  static createUser = async (req, res) => {
    try {
      const u = req.body;
      u.password = await bcrypt.hash(u.password, 10);
      const user = await User.query().insert(u);
      const token = user.generateAuthToken();
      console.log(token);
      res
        .header("x-auth-token", token)
        .status(200)
        .send({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        });
    } catch (err) {
      res.status(500).send(err);
      throw new Error(err);
    }
  };

  static getUser = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await User.query()
        .findById(id)
        .select("id, email, name, role");
      res.status(200).json(user);
    } catch (err) {
      res.status(500).send(err);
      throw new Error("whoops");
    }
  };

  static login = async (req, res) => {
    try {
      const body = req.body;
      console.log(req);
      if (!body.email) {
        return res.status(422).json({
          errors: {
            email: "is required"
          }
        });
      }
      if (!body.password) {
        return res.status(422).json({
          errors: {
            password: "is required"
          }
        });
      }

      const email = body.email;
      const user = await User.query()
        .where({ email })
        .first();
      if (!user) {
        throw new Error("Authentication Failed");
      }

      console.log(user);
      //using bcrypt to compare passwords
      const passwordValidated = await bcrypt.compare(
        body.password,
        user.password
      );
      if (!passwordValidated) {
        throw new Error("Authentication Failed");
      }

      // If got here - OK - send back token
      const token = user.generateAuthToken();
      res
        .header("x-access-token", token)
        .status(200)
        .send({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        });
    } catch (err) {
      res.status(500).send(err);
      throw new Error(err);
    }
  };
}

module.exports = UserController;
