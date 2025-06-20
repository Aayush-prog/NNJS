const mongoose = require("mongoose");
const getHistory = async (req, res) => {
  const PageModel = mongoose.model("Page");
  try {
    const history = await PageModel.findOne({ type: "History" })
      .populate("heroSection")
      .populate("subSection1")
      .populate("subSection2");
    res.status(200).json({ status: "success", data: history });
  } catch (e) {
    res.status(400).json({ msg: e.msg || "error" });
  }
};
module.exports = getHistory;
