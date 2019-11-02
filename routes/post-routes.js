const express = require("express");
const router = express.Router();
const postController = require("../controllers/post-controller");
const auth = require("../middleware/auth");

router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);
router.post("/", auth, postController.createPost);
router.delete("/:id", auth, postController.deletePost);
router.put("/:id", auth, postController.updatePost);

module.exports = router;
