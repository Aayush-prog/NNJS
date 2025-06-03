const mongoose = require("mongoose");
const getCommitmentById = async (req, res) => {
  const CommitmentModel = mongoose.model("Commitments");
  const { commitmentId } = req.params;
  try {
    const commitment = await CommitmentModel.findById(commitmentId);
    if (!commitment) {
      return res.status(404).json({
        status: "error",
        message: "Commitments not found",
      });
    }
    res.satus(201).json({
      status: "success",
      message: "Commitments found successfully",
      data: commitment,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getCommitmentById;
