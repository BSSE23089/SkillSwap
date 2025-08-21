const mongoose = require("mongoose");
const { Schema } = mongoose;

const skillSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    category: String,
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    type: { type: String, enum: ["teach", "learn"], required: true },

    // Only for teacher
    duration: {
      type: String,
      required: function () {
        return this.type === "teach";
      },
    },
    cost: {
      type: Number,
      default: 0,
      required: function () {
        return this.type === "teach";
      },
    },

    availability: [String],
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
