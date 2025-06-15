const mongoose = require("mongoose");
const path = require("path");
const createMedia = async (req, res) => {
  const MediaModel = mongoose.model("Media");
  const { title, body, link, video, type } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  const file = req.files?.file?.[0]
    ? path.basename(req.files.file[0].path)
    : null;
  const images = req.files?.images?.map((image) => path.basename(image.path));
  try {
    const newMedia = await MediaModel.create({
      title,
      body,
      link,
      video,
      type,
      image,
      images,
      file,
    });
    res.status(201).json({
      status: "success",
      message: "Media created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createMedia;
