const mongoose = require("mongoose");
const getLanding = async (req, res) => {
  const PageModel = mongoose.model("Page");
  try {
    const page = await PageModel.find({ type: "Landing" })
      .populate("heroSection")
      .populate("subSection1");
    console.log(page);
    res.status(200).send({ status: "success", data: page });
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: e.msg || "error" });
  }
};
module.exports = getLanding;
