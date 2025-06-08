const mongoose = require("mongoose");
const personSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    body: { type: String, required: true },
    duration: { type: String },
    image: { type: String },
    type: {
      type: String,
      enum: ["Past", "Current", "Founder"],
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Person", personSchema);
