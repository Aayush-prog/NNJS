const mongoose = require("mongoose");
const delMedia = async (req, res) => {
  const MediaModel = mongoose.model("Media");
  const {} = req.body;
  const { mediaId } = req.params;
  try {
    const media = await MediaModel.findById(mediaId);
    if (!media) {
      return res.status(404).json({
        status: "error",
        message: "Media not found",
      });
    }
    const deletedMedia = await MediaModel.findByIdAndDelete(mediaId);
    res.status(200).json({
      status: "success",
      message: "Media deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delMedia;
