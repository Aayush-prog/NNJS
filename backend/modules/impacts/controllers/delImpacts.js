const mongoose = require("mongoose");
const delImpacts = async (req, res) => {
  const ImpactModel = mongoose.model("Impacts");
  const {} = req.body;
  const { impactId } = req.params;
  try {
    const impact = await ImpactModel.findById(impactId);
    if (!impact) {
      return res.status(404).json({
        status: "error",
        message: "Impacts not found",
      });
    }
    const deletedImpact = await ImpactModel.findByIdAndDelete(impactId);
    res.satus(201).json({
      status: "success",
      message: "Impacts deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delImpacts;
