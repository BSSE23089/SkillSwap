const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");

// GET /api/stats
router.get("/", statsController.getStats);

// PUT /api/stats
router.put("/", statsController.updateStats);

module.exports = router;
