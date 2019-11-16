const Post = require("../models/post-model");

class PostController {
  static async getPosts(req, res) {
    try {
      const posts = await Post.query().orderBy("published_dt", "desc");
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

  static async getRelated(req, res) {
    try {
      const id = parseInt(req.params.id);
      const post = await Post.query().findById(id);
      const parent_id = post.parent_id;
      const host = req.get("host");
      const protocol = req.protocol;

      // Get parent post, sibling posts and children posts
      const parent = await Post.query()
        .findById(parent_id)
        .select(["id", "title"]);

      const siblings = await Post.query()
        .where("parent_id", parent_id)
        .whereNotNull("parent_id")
        .orderBy("title")
        .select(["id", "title"]);
      siblings.map(p => (p.url = `${protocol}://${host}/posts/${p.id}`));

      const children = await Post.query()
        .where("parent_id", id)
        .orderBy("title")
        .select(["id", "title"]);
      children.map(p => (p.url = `${protocol}://${host}/posts/${p.id}`));

      res.status(200).json({
        hasRelations: !!(
          parent ||
          (Array.isArray(siblings) && siblings.length) ||
          (Array.isArray(children) && children.length)
        ),
        parent: parent || null,
        siblings: siblings,
        children: children
      });
    } catch (err) {
      res.status(500).send(err);
      throw new Error(err);
    }
  }

  static async updatePost(req, res) {
    try {
      console.log(req.body.parent_id);
      const id = parseInt(req.params.id);
      const rows = await Post.query()
        .findById(id)
        .patch(req.body);
      res.status(200).send("Updated OK");
    } catch (err) {
      res.status(500).send(err);
      throw new Error(err);
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
