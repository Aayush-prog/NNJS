const mongoose = require("mongoose");
const getMission = async (req, res) => {
  const PageModel = mongoose.model("Page");
  try {
    const mission = await PageModel.findOne({ type: "Mission" })
      .populate("heroSection")
      .populate("subSection1")
      .populate("subSection2");
    res.status(200).json({ status: "success", data: mission });
  } catch (e) {
    res.status(400).json({ msg: e.msg || "error" });
  }
};
module.exports = getMission;
