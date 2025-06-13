const mongoose = require("mongoose");
const getBranchById = async (req, res) => {
  const BranchModel = mongoose.model("Branches");
  const { branchId } = req.params;
  try {
    const branch = await BranchModel.findById(branchId);
    if (!branch) {
      return res.status(404).json({
        status: "error",
        message: "Branches not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Branches found successfully",
      data: branch,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getBranchById;
