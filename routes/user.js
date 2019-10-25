const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const express = require("express");
const db = require("../models/db");
const router = express.Router();

// Generates AUTH token
generateAuthToken = user => {
  try {
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.APP_SECRET_KEY
    );
    return token;
  } catch (err) {
    throw new Error(err);
  }
};

// Gets the current user
router.get("/current", auth, async (req, res) => {
  const user = await db.getUser(req.user.id);
  res.send(user);
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    // validate the request body first
    const schema = {
      name: Joi.string()
        .min(3)
        .max(50)
        .required(),
      email: Joi.string()
        .min(5)
        .max(255)
        .required()
        .email(),
      password: Joi.string()
        .min(8)
        .max(255)
        .required()
    };

    const { error } = Joi.validate(req.body, schema);

    if (error) return res.status(400).send(error.details[0].message);

    user = {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      role: "member"
    };

    user.password = await bcrypt.hash(user.password, 10);
    const id = await db.createUser(user);
    user = await db.getUser(id);
    const token = generateAuthToken(user);

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
    return res.status(500).send(err);
  }
});

module.exports = router;
