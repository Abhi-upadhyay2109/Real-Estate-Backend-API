const express = require("express");
const router = express.Router();
const recommendationController = require("../controllers/recommendationController");

router.get("/:id", recommendationController.recommendations);

module.exports = router;
