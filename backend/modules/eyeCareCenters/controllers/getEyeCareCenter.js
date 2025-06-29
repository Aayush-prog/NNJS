const mongoose = require("mongoose");
const getEyeCareCenter = async (req, res) => {
  const EyeCareCenterModel = mongoose.model("EyeCareCenters");
  try {
    const eyeCareCenter = await EyeCareCenterModel.find().sort({ title: 1 });
    res.status(200).json({
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
module.exports = getEyeCareCenter;
