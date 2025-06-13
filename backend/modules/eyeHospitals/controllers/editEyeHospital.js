const mongoose = require("mongoose");
const path = require("path");
const editEyeHospital = async (req, res) => {
  const EyeHospitalModel = mongoose.model("EyeHospitals");
  const {
    title,
    body,
    phone,
    email,
    website,
    address,
    aim,
    coverageArea,
    availableServices,
    communityServices,
    futurePlans,
    totalOPD,
    totalSurgery,
  } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  const { eyeHospitalId } = req.params;
  try {
    const eyeHospital = await EyeHospitalModel.findById(eyeHospitalId);
    if (!eyeHospital) {
      return res.status(404).json({
        status: "error",
        message: "EyeHospitals not found",
      });
    }
    const updatedEyeHospital = await EyeHospitalModel.findByIdAndUpdate(
      eyeHospitalId,
      {
        title,
        body,
        phone,
        email,
        website,
        address,
        image,
        aim,
        coverageArea,
        availableServices,
        communityServices,
        futurePlans,
        totalOPD,
        totalSurgery,
      }
    );
    res.status(200).json({
      status: "success",
      message: "EyeHospitals updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editEyeHospital;
