const mongoose = require("mongoose");
const { Schema } = mongoose;

const statsSchema = new Schema({
  totalUsers: Number,
  totalSkills: Number,
  totalConnections: Number,
  totalCompletedSessions: Number,
  averageSessionRating: Number,
  lastUpdated: Date
});

module.exports = mongoose.model("Stats", statsSchema);
