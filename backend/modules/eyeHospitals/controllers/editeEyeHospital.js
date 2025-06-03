const mongoose = require("mongoose");
const editEyeHospital = async (req, res) => {
  const EyeHospitalModel = mongoose.model("EyeHospitals");
  const {} = req.body;
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
      {}
    );
    res.satus(201).json({
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
