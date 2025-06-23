const mongoose = require("mongoose");
const deleteImage = require("../../../handlers/delImage");
const deleteFile = require("../../../handlers/delFile");

const delMedia = async (req, res) => {
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

    const deletedMedia = await MediaModel.findByIdAndDelete(mediaId);

    
    if (media.image) {
      deleteImage(media.image);
    }

    if (media.file) {
      deleteFile(media.file);
    }

    if (media.images && media.images.length > 0) {
      media.images.forEach((image) => deleteImage(image));
    }

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
