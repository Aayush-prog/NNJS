const mongoose = require("mongoose");

const ircSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String },
    color: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("IrcObjectives", ircSchema);
