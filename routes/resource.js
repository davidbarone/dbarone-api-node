const express = require("express");
const router = express.Router();
const db = require("../models/db");

router.get("/", db.getResources);
router.get("/:id", db.getResource);
router.get("/filename/:filename", db.getResourceByName);

module.exports = router