const mongoose = require("mongoose");
const path = require("path");
const editBranch = async (req, res) => {
  const BranchModel = mongoose.model("Branches");
  const { contactPerson, phone, president, district, committee } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  const { branchId } = req.params;
  try {
    const branch = await BranchModel.findById(branchId);
    if (!branch) {
      return res.status(404).json({
        status: "error",
        message: "Branches not found",
      });
    }
    const updatedBranch = await BranchModel.findByIdAndUpdate(branchId, {
      contactPerson,
      phone,
      president,
      district,
      image,
      committee,
    });
    res.status(200).json({
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
