const Post = require("../models/post-model");

class PostController {
  static getPosts = async (req, res) => {
    try {
      const posts = await Post.query();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).send(error);
      throw new Error("whoops");
    }
  };

  static createPost = async (req, res) => {
    try {
      const post = await Post.query().insert(req.body);
      res.status(201).json(post);
    } catch (err) {
      res.status(500).send(error);
      throw new Error("whoops");
    }
  };

  static getPost = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await Post.query().findById(id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).send(error);
      throw new Error("whoops");
    }
  };

  static updatePost = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const rows = await Post.query()
        .findById(id)
        .patch(req.body);
      res.status(200).send("Updated OK");
    } catch (err) {
      res.status(500).send(error);
      throw new Error("whoops");
    }
  };

  static deletePost = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const rows = await Post.query().deleteById(id);
      res.status(200).send("Deleted OK");
    } catch (err) {
      res.status(500).send(error);
      throw new Error("whoops");
    }
  };
}

module.exports = PostController;
