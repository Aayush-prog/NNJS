const mongoose = require("mongoose");
const getEyeHospitals = async (req, res) => {
  const EyeHospitalModel = mongoose.model("EyeHospitals");
  try {
    const eyeHospital = await EyeHospitalModel.find();
    res.satus(201).json({
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
module.exports = getEyeHospitals;
