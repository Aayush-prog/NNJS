const mongoose = require("mongoose");
const getMediaById = async (req, res) => {
  const MediaModel = mongoose.model("Media");
  const { mediaId } = req.params;
  try {
    const media = await MediaModel.findById(mediaId);
    if (!media) {
      return res.status(404).json({
        status: "error",
        message: "Media not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Media found successfully",
      data: media,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getMediaById;
