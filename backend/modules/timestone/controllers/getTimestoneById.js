const mongoose = require("mongoose");
const getTimestoneById = async (req, res) => {
  const TimestoneModel = mongoose.model("Timestones");
  const { timestoneId } = req.params;
  try {
    const timestone = await TimestoneModel.findById(timestoneId);
    if (!timestone) {
      return res.status(404).json({
        status: "error",
        message: "Timestones not found",
      });
    }
    res.satus(201).json({
      status: "success",
      message: "Timestones found successfully",
      data: timestone,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getTimestoneById;
