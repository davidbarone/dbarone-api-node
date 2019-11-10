const Post = require("../models/post-model");

class PostController {
  static async getPosts(req, res) {
    try {
      const posts = await Post.query();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).send(err);
      throw new Error("whoops");
    }
  }

  static async createPost(req, res) {
    try {
      req.body.updated_dt = new Date().toISOString();
      req.body.updated_by = req.user.name;
      const post = await Post.query().insert(req.body);
      res.status(201).json(post);
    } catch (err) {
      res.status(500).send(err);
      throw new Error(err);
    }
  }

  static async getPost(req, res) {
    try {
      const id = parseInt(req.params.id);
      const post = await Post.query().findById(id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).send(err);
      throw new Error("whoops");
    }
  }

  static async updatePost(req, res) {
    try {
      const id = parseInt(req.params.id);
      const rows = await Post.query()
        .findById(id)
        .patch(req.body);
      res.status(200).send("Updated OK");
    } catch (err) {
      res.status(500).send(err);
      throw new Error("whoops");
    }
  }

  static async deletePost(req, res) {
    try {
      const id = parseInt(req.params.id);
      const rows = await Post.query().deleteById(id);
      res.status(200).send("Deleted OK");
    } catch (err) {
      res.status(500).send(err);
      throw new Error("whoops");
    }
  }
}

module.exports = PostController;
