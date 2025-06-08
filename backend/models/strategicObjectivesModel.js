const mongoose = require("mongoose");
const strategicObjectiveSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "StrategicObjectives",
  strategicObjectiveSchema
);
