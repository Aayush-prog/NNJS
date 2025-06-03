const mongoose = require("mongoose");
const boardSchema = new mongoose.Schema(
  {
    people: { type: [{ type: mongoose.Schema.Types.ObjectId }], ref: "Person" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("BoardMembers", boardSchema);
