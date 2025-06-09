const mongoose = require("mongoose");
const impactSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    count: { type: String, required: true },
    image: { type: String },
    icon: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Impacts", impactSchema);
