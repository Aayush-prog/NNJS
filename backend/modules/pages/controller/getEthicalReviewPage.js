const mongoose = require("mongoose");
const getEthicalReviewPage = async (req, res) => {
  const PageModel = mongoose.model("Page");
  try {
    const ethicalReviewPage = await PageModel.findOne({
      type: "EthicalReview",
    }).populate();
    res.status(200).json({ status: "success", data: ethicalReviewPage });
  } catch (e) {
    res.status(400).json({ msg: e.msg || "error" });
  }
};
module.exports = getEthicalReviewPage;
