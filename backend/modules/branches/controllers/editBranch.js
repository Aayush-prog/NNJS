const mongoose = require("mongoose");
const editBranch = async (req, res) => {
  const BranchModel = mongoose.model("Branches");
  const {} = req.body;
  const { branchId } = req.params;
  try {
    const branch = await BranchModel.findById(branchId);
    if (!branch) {
      return res.status(404).json({
        status: "error",
        message: "Branches not found",
      });
    }
    const updatedBranch = await BranchModel.findByIdAndUpdate(branchId, {});
    res.satus(201).json({
      status: "success",
      message: "Branches updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editBranch;
