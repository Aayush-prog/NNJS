const mongoose = require("mongoose");
const delCommitment = async (req, res) => {
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
    const deletedCommitment = await CommitmentModel.findByIdAndDelete(
      commitmentId
    );
    res.status(200).json({
      status: "success",
      message: "Commitments deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delCommitment;
