const mongoose = require("mongoose");
const getFounders = async (req, res) => {
  const FounderModel = mongoose.model("Founders");
  try {
    const founder = await FounderModel.find();
    res.satus(201).json({
      status: "success",
      message: "Founders found successfully",
      data: founder,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getFounders;
