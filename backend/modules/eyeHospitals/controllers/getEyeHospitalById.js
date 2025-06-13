const mongoose = require("mongoose");
const getEyeHospitalById = async (req, res) => {
  const EyeHospital = mongoose.model("EyeHospitals");
  const { eyeHospitalId } = req.params;
  try {
    const eyeHospital = await EyeHospital.findById(eyeHospitalId);
    if (!eyeHospital) {
      return res.status(404).json({
        status: "error",
        message: "EyeHospitals not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "EyeHospitals found successfully",
      data: eyeHospital,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getEyeHospitalById;
