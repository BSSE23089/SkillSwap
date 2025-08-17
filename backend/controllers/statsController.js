const Stats = require("../models/Stats");

// GET stats
exports.getStats = async (req, res) => {
  try {
    let stats = await Stats.findOne({});
    if (!stats) {
      // If no stats document exists, create default
      stats = new Stats({
        totalUsers: 0,
        totalSkills: 0,
        totalConnections: 0,
        totalCompletedSessions: 0,
        averageSessionRating: 0,
        lastUpdated: new Date(),
      });
      await stats.save();
    }
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE stats
exports.updateStats = async (req, res) => {
  try {
    const stats = await Stats.findOne({});
    if (!stats) {
      return res.status(404).json({ error: "Stats not found" });
    }

    // Only update fields provided in body
    const fields = [
      "totalUsers",
      "totalSkills",
      "totalConnections",
      "totalCompletedSessions",
      "averageSessionRating",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        stats[field] = req.body[field];
      }
    });

    stats.lastUpdated = new Date();
    await stats.save();

    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
