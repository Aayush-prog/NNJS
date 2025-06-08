const mongoose = require("mongoose");
const createImpacts = async (req, res) => {
  const ImpactModel = mongoose.model("Impacts");
  const { title, count, image } = req.body;
  try {
    const newImpact = await ImpactModel.create({ title, count, image });
    res.satus(201).json({
      status: "success",
      message: "Impacts created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createImpacts;
