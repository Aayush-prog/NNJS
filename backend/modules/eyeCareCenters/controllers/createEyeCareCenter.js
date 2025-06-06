const mongoose = require("mongoose");
const createEyeCareCenter = async (req, res) => {
  const EyeCareCenterModel = mongoose.model("EyeCareCenters");
  const { title, body, district, contactNum, contactPerson, image } = req.body;
  try {
    const newEyeCareCenter = await EyeCareCenterModel.create({
      title,
      body,
      district,
      contactNum,
      contactPerson,
      image,
    });
    res.satus(201).json({
      status: "success",
      message: "EyeCareCenters created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createEyeCareCenter;
