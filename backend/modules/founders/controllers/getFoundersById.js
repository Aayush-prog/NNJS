const mongoose = require("mongoose");
const getFoundersById = async (req, res) => {
  const FounderModel = mongoose.model("Founders");
  const { founderId } = req.params;
  try {
    const founder = await FounderModel.findById(founderId);
    if (!founder) {
      return res.status(404).json({
        status: "error",
        message: "Founders not found",
      });
    }
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
module.exports = getFoundersById;
