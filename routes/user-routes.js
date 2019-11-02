const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const express = require("express");
const UserController = require("../controllers/user-controller");
const router = express.Router();

router.get("/current", UserController.getUser);
router.post("/", auth, UserController.createUser);
router.post("/login", UserController.login);

module.exports = router;
