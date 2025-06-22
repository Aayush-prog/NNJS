const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema(
  {
    name: { type: String },
    image: { type: String, required: true },
    type: {
      type: String,
      enum: ["Current", "Past", "Special"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Partners", partnerSchema);
