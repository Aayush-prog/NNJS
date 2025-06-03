const mongoose = require("mongoose");

const landingSchema = new mongoose.Schema(
  {
    heroSection: { type: mongoose.Schema.ObjectId, ref: "Hero" },
    subSection1: { type: mongoose.Schema.ObjectId, ref: "SubSection" },
    subSection2: { type: mongoose.Schema.ObjectId, ref: "SubSection" },
    subSection3: { type: mongoose.Schema.ObjectId, ref: "SubSection" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Landing", landingSchema);
