const mongoose = require("mongoose");
const getTeamPage = async (req, res) => {
  const PageModel = mongoose.model("Page");
  try {
    const teampage = await PageModel.findOne({ type: "Team" })
      .populate("heroSection")
      .populate("subSection1");
    res.status(200).json({ status: "success", data: teampage });
  } catch (e) {
    res.status(400).json({ msg: e.msg || "error" });
  }
};
module.exports = getTeamPage;
