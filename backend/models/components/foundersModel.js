const mongoose = require("mongoose");
const foundersSchema = new mongoose.Schema(
  {
    people: { type: [{ type: mongoose.Schema.Types.ObjectId }], ref: "Person" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Founders", foundersSchema);
