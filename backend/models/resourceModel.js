const mongoose = require("mongoose");
const resourceSchema = new mongoose.Schema({
  title: { type: String, require: true },
  body: { type: String },
  link: { type: String },
  file: { type: String },
  type: {
    type: String,
    enum: [
      "Notice & Reports",
      "Guidelines & Protocols",
      "Media & Bulletins",
      "Publications",
    ],
    required: true,
  },
});

module.exports = mongoose.model("Resources", resourceSchema);
