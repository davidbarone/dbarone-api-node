const Resource = require("../models/resource-model");

class ResourceController {
  static async getResources(req, res) {
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
  }

  static async getResource(req, res) {
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
  }

  static async getResourceByName(req, res) {
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
  }
}

module.exports = ResourceController;
