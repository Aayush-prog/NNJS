const mongoose = require("mongoose");
const getMedias = async (req, res) => {
  const MediaModel = mongoose.model("Media");
  try {
    const news = await MediaModel.find({ type: "News" });
    const press = await MediaModel.find({ type: "Press Releases" });
    const gallery = await MediaModel.find({ type: "Gallery" });
    res.status(200).json({
      status: "success",
      message: "Media found successfully",
      news,
      press,
      gallery,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getMedias;
