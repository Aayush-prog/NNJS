const mongoose = require("mongoose");
const path = require("path");
const createImpacts = async (req, res) => {
  const ImpactModel = mongoose.model("Impacts");
  const { title, count, icon } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  try {
    const newImpact = await ImpactModel.create({ title, count, image, icon });
    res.status(201).json({
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
