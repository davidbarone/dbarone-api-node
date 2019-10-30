const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

class UserController {
  static createUser = async (req, res) => {
    try {
      const u = req.body;
      u.password = await bcrypt.hash(u.password, 10);
      const user = await User.query().insert(u);
      const token = user.generateAuthToken();
      res
        .header("x-auth-token", token)
        .status(200)
        .send({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        });
      res.status(201).send(`New user ${user.id} created.`);
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
}

module.exports = UserController;
