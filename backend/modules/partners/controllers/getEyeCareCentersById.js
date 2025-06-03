const mongoose = require("mongoose");
const getEyeCareCenterById = async (req, res) => {
  const EyeCareCenterModel = mongoose.model("EyeCareCenters");
  const { eyeCareCenterId } = req.params;
  try {
    const eyeCareCenter = await EyeCareCenterModel.findById(eyeCareCenterId);
    if (!eyeCareCenter) {
      return res.status(404).json({
        status: "error",
        message: "EyeCareCenters not found",
      });
    }
    res.satus(201).json({
      status: "success",
      message: "EyeCareCenters found successfully",
      data: eyeCareCenter,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getEyeCareCenterById;
