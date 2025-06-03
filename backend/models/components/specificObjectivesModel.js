const mongoose = require("mongoose");
const specificObjectiveSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    objectives: { type: [{ type: String }], required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("SpecificObjectives", specificObjectiveSchema);
