const mongoose = require("mongoose");
const path = require("path");
const deleteImage = require("../../../handlers/delImage");
const deleteFile = require("../../../handlers/delFile");

const editMedia = async (req, res) => {
  const MediaModel = mongoose.model("Media");
  const { title, body, link, video, type, imageDeleted, fileDeleted, imagesDeleted } = req.body;
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

    if (imageDeleted === "true" && media.image) {
      deleteImage(media.image);
    }
    
   
    if (fileDeleted === "true" && media.file) {
      deleteFile(media.file);
    }


    if (imagesDeleted === "true" && media.images && media.images.length > 0) {
      media.images.forEach(image => deleteImage(image));
    }

  
    if (image && media.image && imageDeleted !== "true") {
      deleteImage(media.image);
    }


    if (file && media.file && fileDeleted !== "true") {
      deleteFile(media.file);
    }

    if (images && images.length > 0 && media.images && media.images.length > 0 && imagesDeleted !== "true") {
      media.images.forEach(image => deleteImage(image));
    }

  
    const updatedMedia = await MediaModel.findByIdAndUpdate(mediaId, {
      title,
      body,
      link,
      video,
      type,
      image: imageDeleted === "true" ? null : (image || media.image),
      file: fileDeleted === "true" ? null : (file || media.file),
      images: imagesDeleted === "true" ? [] : (images || media.images),
    });

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