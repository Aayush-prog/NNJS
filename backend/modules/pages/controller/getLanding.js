const mongoose = require("mongoose");
const getLanding = async (req, res) => {
  const PageModel = mongoose.model("Page");
  try {
    const page = PageModel.findOne({ type: "Landing" }).populate();
    res.status(200).json({ status: "success", data: page });
  } catch (e) {
    res.status(400).json({ msg: e.msg || "error" });
  }
};
module.exports = getLanding;
