const mongoose = require("mongoose");
const editFounder = async (req, res) => {
  const FounderModel = mongoose.model("Founders");
  const {} = req.body;
  const { founderId } = req.params;
  try {
    const founderId = await FounderModel.findById(founderId);
    if (!founderId) {
      return res.status(404).json({
        status: "error",
        message: "Founders not found",
      });
    }
    const updatedEyeCareCenter = await FounderModel.findByIdAndUpdate(
      founderId,
      {}
    );
    res.satus(201).json({
      status: "success",
      message: "Founders updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editFounder;
