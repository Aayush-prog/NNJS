const mongoose = require("mongoose");
const deleteImage = require("../../../handlers/delImage");
const delBranch = async (req, res) => {
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
    const deletedBranch = await BranchModel.findByIdAndDelete(branchId);
    deleteImage(branch.image);
    res.status(200).json({
      status: "success",
      message: "Branches deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delBranch;
