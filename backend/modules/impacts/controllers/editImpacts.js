const mongoose = require("mongoose");
const path = require("path");
const editImpacts = async (req, res) => {
  const ImpactModel = mongoose.model("Impacts");
  const { title, count } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  const { impactId } = req.params;
  try {
    const impact = await ImpactModel.findById(impactId);
    if (!impact) {
      return res.status(404).json({
        status: "error",
        message: "Impacts not found",
      });
    }
    const updatedImpact = await ImpactModel.findByIdAndUpdate(impactId, {
      title,
      count,
      image,
    });
    res.satus(201).json({
      status: "success",
      message: "Impacts updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editImpacts;
