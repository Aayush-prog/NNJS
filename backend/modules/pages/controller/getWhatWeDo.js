const mongoose = require("mongoose");
const getWhatWeDo = async (req, res) => {
  const PageModel = mongoose.model("Page");
  try {
    const whatWeDoPage = await PageModel.findOne({
      type: "What We Do",
    }).populate();
    res.status(200).json({ status: "success", data: whatWeDoPage });
  } catch (e) {
    res.status(400).json({ msg: e.msg || "error" });
  }
};
module.exports = getWhatWeDo;
