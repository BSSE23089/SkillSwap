const User = require("../models/User");

// =============================
// @desc   Get current logged-in user profile
// @route  GET /api/users/me
// @access Private
// =============================
const getMe = async (req, res) => {
  try {
    // req.user already populated by middleware
    res.json({ success: true, user: req.user });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};


// =============================
// @desc   Update user profile
// @route  PUT /api/users/:id
// @access Private
// =============================
const updateProfile = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    const { name, bio, location, role, themePreference } = req.body;
    let {avatarUrl} = req.body;

    // ✅ If file uploaded, set avatar path correctly
   if (req.file) {
  avatarUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
}


    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, bio, location, avatarUrl, role, themePreference },
      { new: true }
    ).select("-passwordHash");

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};


// =============================
// @desc   Update user skills
// @route  PUT /api/users/:id/skills
// @access Private
// =============================
const updateSkills = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    const { skillsTeach, skillsLearn } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { skillsTeach, skillsLearn },
      { new: true }
    )
      .populate("skillsTeach")
      .populate("skillsLearn")
      .select("-passwordHash");

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Update skills error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = {
  getMe,
  updateProfile,
  updateSkills,
};
