const mongoose = require("mongoose");
const path = require("path");
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
    const updatedValue = await ValueModel.findByIdAndUpdate(valueId, {
      title,
      body,
      image,
    });
    res.satus(201).json({
      status: "success",
      message: "Values updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editValue;
