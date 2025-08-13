const mongoose = require("mongoose");
const { Schema } = mongoose;

const requestSchema = new Schema({
  skillId: { type: Schema.Types.ObjectId, ref: "Skill", required: true },
  learnerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { 
    type: String, 
    enum: ["pending", "accepted", "declined", "completed"], 
    default: "pending" 
  },
  declineReason: String,
  canContact: { type: Boolean, default: false },
  completedAt: Date
}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema);
