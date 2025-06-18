const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema(
  {
    heroSection: { type: mongoose.Schema.ObjectId, ref: "Hero" },
    subSection1: { type: mongoose.Schema.ObjectId, ref: "SubSection" },
    subSection2: { type: mongoose.Schema.ObjectId, ref: "SubSection" },
    subSection3: { type: mongoose.Schema.ObjectId, ref: "SubSection" },
    type: {
      type: String,
      enum: [
        "Landing",
        "Mission",
        "History",
        "Team",
        "What We Do",
        "Partners",
        "Resources",
        "Press/Media",
        "EthicalReview",
        "ContactUs",
        "Donate",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Page", pageSchema);
