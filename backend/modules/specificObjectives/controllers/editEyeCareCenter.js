const mongoose = require("mongoose");
const editEyeCareCenter = async (req, res) => {
  const EyeCareCenterModel = mongoose.model("EyeCareCenters");
  const {} = req.body;
  const { eyeCareCenterId } = req.params;
  try {
    const eyeCareCenter = await EyeCareCenterModel.findById(eyeCareCenterId);
    if (!eyeCareCenter) {
      return res.status(404).json({
        status: "error",
        message: "EyeCareCenters not found",
      });
    }
    const updatedEyeCareCenter = await EyeCareCenterModel.findByIdAndUpdate(
      eyeCareCenterId,
      {}
    );
    res.satus(201).json({
      status: "success",
      message: "EyeCareCenters updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editEyeCareCenter;
