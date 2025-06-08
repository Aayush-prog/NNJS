const mongoose = require("mongoose");
const getImpactById = async (req, res) => {
  const ImpactModel = mongoose.model("Impacts");
  const { impactId } = req.params;
  try {
    const impact = await ImpactModel.findById(impactId);
    if (!impact) {
      return res.status(404).json({
        status: "error",
        message: "Impacts not found",
      });
    }
    res.satus(201).json({
      status: "success",
      message: "Impacts found successfully",
      data: impact,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getImpactById;
