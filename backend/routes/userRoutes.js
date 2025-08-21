const { getMe, updateProfile, updateSkills } = require("../controllers/userController");
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // ✅ import middleware

const router = express.Router();

// Routes
router.get("/me", protect, getMe);
router.put("/:id", protect, upload.single("avatar"), updateProfile);
router.put("/:id/skills", protect, updateSkills);

module.exports = router;
