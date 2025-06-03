const mongoose = require("mongoose");
const createBranch = async (req, res) => {
  const BranchModel = mongoose.model("Branches");
  const {} = req.body;
  try {
    const newBranch = await BranchModel.create({});
    res.satus(201).json({
      status: "success",
      message: "Branches created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createBranch;
