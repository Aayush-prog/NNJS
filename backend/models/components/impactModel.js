const mongoose = require("mongoose");
const impactSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    count: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Impacts", impactSchema);
