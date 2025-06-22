const mongoose = require("mongoose");
const path = require("path");
const deleteImage = require("../../../handlers/delImage");

const editMedia = async (req, res) => {
  const MediaModel = mongoose.model("Media");
  const { title, body, link, video, type, imageDeleted } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  const file = req.files?.file?.[0]
    ? path.basename(req.files.file[0].path)
    : null;
  const images = req.files?.images?.map((image) => path.basename(image.path));
  const { mediaId } = req.params;
  try {
    const media = await MediaModel.findById(mediaId);
    if (!media) {
      return res.status(404).json({
        status: "error",
        message: "Media not found",
      });
    }
     let updatedMedia;
        if (imageDeleted == "true") {
          deleteImage(media.image);
          updatedMedia = await MediaModel.findByIdAndUpdate(mediaId, {
      title,
      body,
      link,
      video,
      type,
      image,
      video,
      images,
    });
        }
        if (image) {
          deleteImage(media.image);
          updatedMedia = await MediaModel.findByIdAndUpdate(mediaId, {
      title,
      body,
      link,
      video,
      type,
      image,
      video,
      images,
    });
        } else {
         updatedMedia = await MediaModel.findByIdAndUpdate(mediaId, {
      title,
      body,
      link,
      video,
      type,
      image,
      video,
      images,
    });
        }
    res.status(200).json({
      status: "success",
      message: "Media updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editMedia;
