const mongoose = require("mongoose");
const getResourcesPage = async (req, res) => {
  const PageModel = mongoose.model("Page");
  try {
    const resourcePage = PageModel.findOne({ type: "Resources" }).populate();
    res.status(200).json({ status: "success", data: resourcePage });
  } catch (e) {
    res.status(400).json({ msg: e.msg || "error" });
  }
};
module.exports = getResourcesPage;
