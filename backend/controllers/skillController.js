const Skill = require("../models/Skill");

// ✅ Create a new skill
const createSkill = async (req, res) => {
  try {
    const skill = new Skill({
      ...req.body,
      userId: req.user._id, // logged-in user as skill owner
    });

    await skill.save();
    res.status(201).json({ success: true, skill });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Get all skills
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().populate("userId", "name email avatarUrl");
    res.json({ success: true, skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get skill by ID
const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id).populate("userId", "name email avatarUrl");
    if (!skill) return res.status(404).json({ success: false, message: "Skill not found" });
    res.json({ success: true, skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update skill (only owner)
const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: "Skill not found" });

    // Only owner can update
    if (skill.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    Object.assign(skill, req.body);
    await skill.save();

    res.json({ success: true, skill });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Delete skill (only owner)
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: "Skill not found" });

    if (skill.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await skill.deleteOne();
    res.json({ success: true, message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};
