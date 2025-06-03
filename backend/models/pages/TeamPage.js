const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    heroSection: { type: mongoose.Schema.ObjectId, ref: "Hero" },
    subSection1: { type: mongoose.Schema.ObjectId, ref: "SubSection" },
    subSection2: { type: mongoose.Schema.ObjectId, ref: "SubSection" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
