const mongoose = require("mongoose");
const path = require("path");
const createEyeHospital = async (req, res) => {
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
  try {
    const newEyeHospital = await EyeHospitalModel.create({
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
    });
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
