const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resource-controller");

router.get("/", resourceController.getResources);
router.get("/:id", resourceController.getResource);
router.get("/name/:file_name", resourceController.getResourceByName);

module.exports = router;
