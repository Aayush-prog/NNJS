const mongoose = require("mongoose");
const path = require("path");
const createEyeCareCenter = async (req, res) => {
  const EyeCareCenterModel = mongoose.model("EyeCareCenters");
  const { title, body, district, contactNum, contactPerson } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
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
