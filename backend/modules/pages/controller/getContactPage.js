const mongoose = require("mongoose");
const getContactPage = async (req, res) => {
  const PageModel = mongoose.model("Page");
  try {
    const contactPage = PageModel.findOne({ type: "Contact" }).populate();
    res.status(200).json({ status: "success", data: contactPage });
  } catch (e) {
    res.status(400).json({ msg: e.msg || "error" });
  }
};
module.exports = getContactPage;
