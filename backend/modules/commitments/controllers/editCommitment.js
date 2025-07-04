const mongoose = require("mongoose");
const path = require("path");
const editCommitment = async (req, res) => {
  const CommitmentModel = mongoose.model("Commitments");
  const { title, body, icon, color } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  const { commitmentId } = req.params;
  try {
    const commitment = await CommitmentModel.findById(commitmentId);
    if (!commitment) {
      return res.status(404).json({
        status: "error",
        message: "Commitments not found",
      });
    }
    const updatedCommitment = await CommitmentModel.findByIdAndUpdate(
      commitmentId,
      { title, body, image, icon, color }
    );
    res.status(200).json({
      status: "success",
      message: "Commitments updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editCommitment;
