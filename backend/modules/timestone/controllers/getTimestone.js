const mongoose = require("mongoose");
const getTimestone = async (req, res) => {
  const TimestoneModel = mongoose.model("Timestones");
  try {
    const timestone = await TimestoneModel.find();
    res.status(200).json({
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
module.exports = getTimestone;
