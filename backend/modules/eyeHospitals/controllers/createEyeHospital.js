const mongoose = require("mongoose");
const createEyeHospital = async (req, res) => {
  const EyeHospitalModel = mongoose.model("EyeHospitals");
  const {} = req.body;
  try {
    const newEyeHospital = await EyeHospitalModel.create({});
    res.satus(201).json({
      status: "success",
      message: "EyeHospitals created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createEyeHospital;
