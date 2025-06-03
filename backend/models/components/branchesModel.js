const mongoose = require("mongoose");
const branchSchema = new mongoose.Schema(
  {
    contactPerson: { type: String },
    phone: { type: String },
    president: { type: String },
    district: { type: String },
    image: { type: String },
    committee: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Branches", branchSchema);
