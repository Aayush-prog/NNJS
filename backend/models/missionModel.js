const mongoose = require("mongoose");
const missionSchema = new mongoose.Schema(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Mission", missionSchema);
