const mongoose = require("mongoose");
const getBranches = async (req, res) => {
  const EyeCareCenterModel = mongoose.model("Branches");
  try {
    const branches = await EyeCareCenterModel.find();
    res.satus(201).json({
      status: "success",
      message: "Branches found successfully",
      data: branches,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getBranches;
