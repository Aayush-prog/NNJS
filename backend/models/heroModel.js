const mongoose = require("mongoose");
const heroSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Hero", heroSchema);
