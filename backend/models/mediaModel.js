const mongoose = require("mongoose");
const mediaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String },
    link: { type: String },
    file: { type: String },
    image: { type: String },
    images: [{ type: String }],
    video: { type: String },
    type: { type: String, enum: ["News", "Press Releases", "Gallery"] },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Media", mediaSchema);
