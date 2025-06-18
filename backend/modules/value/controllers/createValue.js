const mongoose = require("mongoose");
const path = require("path");
const createValue = async (req, res) => {
  const ValueModel = mongoose.model("Values");
  const { title, body } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  try {
    const newValue = await ValueModel.create({ title, body, image });
    res.status(201).json({
      status: "success",
      message: "Values created successfully",
      dat: newValue,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createValue;
