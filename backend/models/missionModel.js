const mongoose = require("mongoose");
const missionSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Mission", missionSchema);
