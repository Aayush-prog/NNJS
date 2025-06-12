const mongoose = require("mongoose");
const getResource = async (req, res) => {
  const ResourceModel = mongoose.model("Resources");
  try {
    const notices = await ResourceModel.find({ type: "Notice & Reports" });
    const guidelines = await ResourceModel.find({
      type: "Guidelines & Protocols",
    });
    const media = await ResourceModel.find({ type: "Media & Bulletins" });
    const publications = await ResourceModel.find({ type: "Publications" });
    res.status(200).json({
      status: "success",
      message: "Resources found successfully",
      notices,
      guidelines,
      media,
      publications,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getResource;
