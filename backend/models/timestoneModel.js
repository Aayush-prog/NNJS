const mongoose = require("mongoose");
const timestoneSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    year: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Timestones", timestoneSchema);
