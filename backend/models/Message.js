const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  requestId: { type: Schema.Types.ObjectId, ref: "Request", required: true },
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: String,
  fileUrl: String
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
