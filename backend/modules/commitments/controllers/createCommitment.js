const mongoose = require("mongoose");
const createCommitment = async (req, res) => {
  const CommitmentModel = mongoose.model("Commitments");
  const { title, body, image } = req.body;
  try {
    const newCommitment = await CommitmentModel.create({ title, body, image });
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
