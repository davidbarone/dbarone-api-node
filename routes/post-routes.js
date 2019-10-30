const express = require("express");
const router = express.Router();
const postController = require("../controllers/post-controller");

router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);
router.post("/", postController.createPost);
router.delete("/:id", postController.deletePost);
router.put("/:id", postController.updatePost);

module.exports = router;
