const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/authController");
const { getMe, updateProfile, updateSkills } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/me", protect, getMe);

// Update profile
router.put("/:id", verifyToken, updateProfile);

// Update skills
router.put("/:id/skills", verifyToken, updateSkills);

module.exports = router;
