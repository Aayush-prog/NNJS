const mongoose = require("mongoose");
const commitmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String },
    icon: { type: String },
    color: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Commitments", commitmentSchema);
