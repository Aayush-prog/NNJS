const mongoose = require("mongoose");
const path = require("path");
const editEyeCareCenter = async (req, res) => {
  const EyeCareCenterModel = mongoose.model("EyeCareCenters");
  const { title, body, district, contactNum, contactPerson } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
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
      { title, body, district, contactNum, contactPerson, image }
    );
    res.status(200).json({
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
