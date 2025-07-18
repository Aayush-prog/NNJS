const mongoose = require("mongoose");
const getPartnerPage = async (req, res) => {
  const PageModel = mongoose.model("Page");
  try {
    const partner = await PageModel.findOne({ type: "Partners" })
      .populate("heroSection")
      .populate("subSection1");
    res.status(200).json({ status: "success", data: partner });
  } catch (e) {
    res.status(400).json({ msg: e.msg || "error" });
  }
};
module.exports = getPartnerPage;
