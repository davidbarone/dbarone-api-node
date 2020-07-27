const Resource = require("../models/resource-model");
var http = require("http");
var formidable = require("formidable");
var fs = require("fs");

class ResourceController {
  static async deleteResource(req, res) {
    try {
      const id = parseInt(req.params.id);
      const rows = await Resource.query().deleteById(id);
      res.status(200).send("Deleted OK");
    } catch (err) {
      res.status(500).send(err);
      throw new Error(err);
    }
  }

  static async uploadResource(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      // uploaded file automatically saved to temp folder on server first
      console.log(files);
      const path = files.resourceFile.path;
      const data = fs.readFileSync(path);

      const upload = files.resourceFile;
      const resource = {
        file_name: upload.name,
        media_type: upload.type,
        data: "\\x" + data.toString("hex"),
        updated_dt: new Date().toISOString(),
        updated_by: req.user.name,
        deleted: false,
      };
      fs.unlinkSync(path);
      const newResource = Resource.query()
        .insert(resource)
        .then(async (result) => {
          // Get new item (minus data field)\
          const resources = await Resource.query().select(
            "id",
            "file_name",
            "media_type",
            "deleted",
            "updated_dt",
            "updated_by"
          );

          const newItem = resources.filter((r) => r.id === result.id)[0];
          res.status(201).json(newItem);
          res.end();
        });
    });
  }

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
        "Content-Disposition": `filename=\"${resource.file_name}\"`,
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
      console.log(name);
      const resource = await Resource.query()
        .where({ file_name: name })
        .first();

      res.writeHead(200, {
        "Content-Type": `${resource.media_type}`,
        "Content-Disposition": `filename=\"${resource.file_name}\"`,
      });
      res.end(resource.data);
      //res.end("alert('This is loaded!');");
    } catch (err) {
      res.status(500).send(err);
      throw new Error("whoops");
    }
  }
}

module.exports = ResourceController;
