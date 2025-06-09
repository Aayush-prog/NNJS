const mongoose = require("mongoose");
const getImpacts = async (req, res) => {
  const ImpactModel = mongoose.model("Impacts");
  try {
    const impact = await ImpactModel.find();
    res.status(200).json({
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
module.exports = getImpacts;
