const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ["request", "system", "update"], required: true },
  relatedRequestId: { type: Schema.Types.ObjectId, ref: "Request" },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);
