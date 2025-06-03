const mongoose = require("mongoose");
const getCommitments = async (req, res) => {
  const CommitmentModel = mongoose.model("Commitments");
  try {
    const commitments = await CommitmentModel.find();
    res.satus(201).json({
      status: "success",
      message: "Commitments found successfully",
      data: commitments,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getCommitments;
