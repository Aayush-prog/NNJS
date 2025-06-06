const mongoose = require("mongoose");
const getValueById = async (req, res) => {
  const ValueModel = mongoose.model("Values");
  const { valueId } = req.params;
  try {
    const value = await ValueModel.findById(valueId);
    if (!value) {
      return res.status(404).json({
        status: "error",
        message: "Values not found",
      });
    }
    res.satus(201).json({
      status: "success",
      message: "Values found successfully",
      data: value,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getValueById;
