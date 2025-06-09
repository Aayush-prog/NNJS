const mongoose = require("mongoose");
const path = require("path");
const createCommitment = async (req, res) => {
  const CommitmentModel = mongoose.model("Commitments");
  const { title, body, icon, color } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  try {
    const newCommitment = await CommitmentModel.create({
      title,
      body,
      image,
      icon,
      color,
    });
    res.status(201).json({
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
