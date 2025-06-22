const mongoose = require("mongoose");
const delEyeHospital = async (req, res) => {
  const EyeHospitalModel = mongoose.model("EyeHospitals");

  const { eyeHospitalId } = req.params;
  try {
    const eyeHospital = await EyeHospitalModel.findById(eyeHospitalId);
    if (!eyeHospital) {
      return res.status(404).json({
        status: "error",
        message: "EyeHospitals not found",
      });
    }
    const deletedEyeHospital = await EyeHospitalModel.findByIdAndDelete(
      eyeHospitalId
    );
    res.status(200).json({
      status: "success",
      message: "EyeHospitals deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delEyeHospital;
