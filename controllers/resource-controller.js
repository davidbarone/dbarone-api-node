const Resource = require("../models/resource-model");

class ResourceController {
  static getResources = async (req, res) => {
    try {
      const resources = await Resource.query().select(
        "id",
        "file_name",
        "media_type",
        "deleted",
        "updated_dt",
        "updated_by"
      );
      res.status(200).json(resources);
    } catch (err) {
      res.status(500).send(err);
      throw new Error("whoops");
    }
  };

  static createPost = async (req, res) => {
    try {
      const post = await Post.query().insert(req.body);
      res.status(201).json(post);
    } catch (err) {
      res.status(500).send(err);
      throw new Error("whoops");
    }
  };

  static getResource = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const resource = await Resource.query().findById(id);
      res.writeHead(200, {
        "Content-Type": `${resource.media_type}`,
        "Content-Disposition": `filename=\"${resource.file_name}\"`
      });
      res.end(resource.data);
    } catch (err) {
      res.status(500).send(err);
      throw new Error("whoops");
    }
  };

  static getResourceByName = async (req, res) => {
    try {
      const name = req.params.file_name;
      const resource = await Resource.query()
        .where({ file_name: name })
        .first();
      res.writeHead(200, {
        "Content-Type": `${resource.media_type}`,
        "Content-Disposition": `filename=\"${resource.file_name}\"`
      });
      res.end(resource.data);
    } catch (err) {
      res.status(500).send(err);
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
      res.status(500).send(err);
      throw new Error("whoops");
    }
  };

  static deletePost = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const rows = await Post.query().deleteById(id);
      res.status(200).send("Deleted OK");
    } catch (err) {
      res.status(500).send(err);
      throw new Error("whoops");
    }
  };
}

module.exports = ResourceController;
