const express = require("express");
const router = express.Router();
const propController = require("../controllers/propertiesController");

router.get("/", propController.getProperties);
router.get("/:id", propController.getProperty);

module.exports = router;
