const mongoose = require("mongoose");
const getMission = async (req, res) => {
  const PageModel = mongoose.model("Page");
  try {
    const mission = PageModel.findOne({ type: "Mission" }).populate();
    res.status(200).json({ status: "success", data: mission });
  } catch (e) {
    res.status(400).json({ msg: e.msg || "error" });
  }
};
module.exports = getMission;
