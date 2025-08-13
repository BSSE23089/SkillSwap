const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  bio: String,
  location: String,
  avatarUrl: String,
  role: [{ type: String, enum: ["learner", "teacher", "dual"] , required : true}],
  rating: Number,
  themePreference: { type: String, enum: ["light", "dark"], default: "light" },
  skillsTeach: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  skillsLearn: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  completedLearningSessionsCount: { type: Number, default: 0 },
  completedTeachingSessionsCount: { type: Number, default: 0 },
  totalStudentsTaught: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
