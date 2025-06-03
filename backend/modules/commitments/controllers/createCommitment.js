const mongoose = require("mongoose");
const createCommitment = async (req, res) => {
  const CommitmentModel = mongoose.model("Commitments");
  const {} = req.body;
  try {
    const newCommitment = await CommitmentModel.create({});
    res.satus(201).json({
      status: "success",
      message: "Commitments created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createCommitment;
