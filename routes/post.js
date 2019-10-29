const express = require("express");
const router = express.Router();
const controller = require("../controllers/post");

router.get("/", controller.getPosts);
router.get("/:id", controller.getPost);
router.post("/", controller.createPost);
router.delete("/:id", controller.deletePost);
router.put("/:id", controller.updatePost);

module.exports = router;
