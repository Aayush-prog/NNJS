const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema(
  {
    heroSection: { type: mongoose.Schema.ObjectId, ref: "Hero" },
    subSection1: { type: mongoose.Schema.ObjectId, ref: "SubSection" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Partner", partnerSchema);
