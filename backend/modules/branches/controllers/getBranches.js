const mongoose = require("mongoose");
const getBranches = async (req, res) => {
  const BranchesModel = mongoose.model("Branches");
  try {
    const branches = await BranchesModel.find().sort({ district: 1 });
    res.status(200).json({
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
