const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema(
  {
    accName: { type: String },
    accNum: { type: String },
    bank: { type: String },
    swiftCode: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bank", bankSchema);
