const mongoose = require("mongoose");
const path = require("path");
const deleteImage = require("../../../handlers/delImage");
const editValue = async (req, res) => {
  const ValueModel = mongoose.model("Values");
  const { title, body } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  const { valueId } = req.params;
  try {
    const value = await ValueModel.findById(valueId);
    if (!value) {
      return res.status(404).json({
        status: "error",
        message: "Values not found",
      });
    }
    let updatedValue;
    if (image) {
      deleteImage(value.image);
      updatedValue = await ValueModel.findByIdAndUpdate(valueId, {
        title,
        body,
        image,
      });
    } else {
      updatedValue = await ValueModel.findByIdAndUpdate(valueId, {
        title,
        body,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Values updated successfully",
      data: updatedValue,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editValue;
