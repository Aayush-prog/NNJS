const mongoose = require("mongoose");
const getResource = async (req, res) => {
  const ResourceModel = mongoose.model("Resources");
  try {
    const notice = await ResourceModel.find({ type: "Notice & Reports" });
    const guidelines = await ResourceModel.find({
      type: "Guidelines & Protocols",
    });
    const media = await ResourceModel.find({ type: "Media & Bulletins" });
    const publications = await ResourceModel.find({ type: "Publications" });
    const awards = await ResourceModel.find({ type: "Awards" });
    const raab = await ResourceModel.find({ type: "RAAB Survey" });
    res.status(200).json({
      status: "success",
      message: "Resources found successfully",
      notice,
      guidelines,
      media,
      publications,
      awards,
      raab,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getResource;
