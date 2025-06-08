const mongoose = require("mongoose");
const delValue = async (req, res) => {
  const ValueModel = mongoose.model("Values");
  const {} = req.body;
  const { valueId } = req.params;
  try {
    const value = await ValueModel.findById(valueId);
    if (!value) {
      return res.status(404).json({
        status: "error",
        message: "Values not found",
      });
    }
    const deletedValue = await ValueModel.findByIdAndDelete(valueId);
    res.satus(201).json({
      status: "success",
      message: "Values deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delValue;
