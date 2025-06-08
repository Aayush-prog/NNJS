const mongoose = require("mongoose");
const eyeHospitalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String },
    phone: { type: String },
    email: { type: String },
    website: { type: String },
    address: { type: String },
    image: { type: String },
    aim: { type: String },
    coverageArea: { type: String },
    availableServices: {
      majorTest: [{ type: String }],
      surgical: [{ type: String }],
    },
    communityServices: [{ type: String }],
    futurePlans: [{ type: String }],
    totalOPD: { type: String },
    totalSurgery: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("EyeHospitals", eyeHospitalSchema);
