const express = require("express");
const router = express.Router();
const db = require("../models/db");

router.get("/", db.getPosts);
router.get("/:id", db.getPost);
router.post("/", db.createPost);
router.delete("/:id", db.deletePost);
router.put("/:id", db.updatePost);

module.exports = router