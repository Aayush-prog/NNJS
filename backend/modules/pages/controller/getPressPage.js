const mongoose = require("mongoose");
const getPressPage = async (req, res) => {
  const PageModel = mongoose.model("Page");
  try {
    const pressPage = await PageModel.findOne({
      type: "Press/Media",
    }).populate("heroSection");
    res.status(200).json({ status: "success", data: pressPage });
  } catch (e) {
    res.status(400).json({ msg: e.msg || "error" });
  }
};
module.exports = getPressPage;
