const express = require("express");
const {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Routes
router.post("/", protect, createSkill);        // Create skill
router.get("/", getSkills);                    // Get all skills
router.get("/:id", getSkillById);              // Get one skill
router.put("/:id", protect, updateSkill);      // Update skill (only owner)
router.delete("/:id", protect, deleteSkill);   // Delete skill (only owner)

module.exports = router;
