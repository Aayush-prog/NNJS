const mongoose = require("mongoose");
const delEyeCareCenter = async (req, res) => {
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
    const deletedEyeCareCenter = await EyeCareCenterModel.findByIdAndDelete(
      eyeCareCenterId
    );
    res.status(200).json({
      status: "success",
      message: "EyeCareCenters deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delEyeCareCenter;
