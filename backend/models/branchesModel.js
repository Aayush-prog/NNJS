const mongoose = require("mongoose");
const branchSchema = new mongoose.Schema(
  {
    contactPerson: { type: String },
    phone: { type: String },
    president: { type: String },
    district: { type: String },
    image: { type: String, default: "1749965337091.jpg" },
    committee: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Branches", branchSchema);
