const mongoose = require("mongoose");
const path = require("path");
const deleteImage = require("../../../handlers/delImage");
const editTimestone = async (req, res) => {
  const TimestoneModel = mongoose.model("Timestones");
  const { title, body, year } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  const { timestoneId } = req.params;
  try {
    const timestone = await TimestoneModel.findById(timestoneId);
    if (!timestone) {
      return res.status(404).json({
        status: "error",
        message: "Timestones not found",
      });
    }
    if (image) {
      deleteImage(timestone.image);
      const updatedTimestone = await TimestoneModel.findByIdAndUpdate(
        timestoneId,
        { title, body, year, image }
      );
    }
    const updatedTimestone = await TimestoneModel.findByIdAndUpdate(
      timestoneId,
      { title, body, year }
    );
    res.status(200).json({
      status: "success",
      message: "Timestones updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editTimestone;
