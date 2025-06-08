const mongoose = require("mongoose");
const eyeCareCenterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String },
    district: { type: String, required: true },
    contactNum: { type: String },
    contactPerson: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("EyeCareCenters", eyeCareCenterSchema);
