const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resource-controller");
const auth = require("../middleware/auth");

router.get("/", resourceController.getResources);
router.get("/:id", resourceController.getResource);
router.get("/name/:file_name", resourceController.getResourceByName);
router.post("/upload", auth, resourceController.uploadResource);
router.delete("/:id", auth, resourceController.deleteResource);
module.exports = router;
