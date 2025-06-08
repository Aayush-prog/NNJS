const mongoose = require("mongoose");
const editTimestone = async (req, res) => {
  const TimestoneModel = mongoose.model("Timestones");
  const { title, body, year, image } = req.body;
  const { timestoneId } = req.params;
  try {
    const timestone = await TimestoneModel.findById(timestoneId);
    if (!timestone) {
      return res.status(404).json({
        status: "error",
        message: "Timestones not found",
      });
    }
    const updatedTimestone = await TimestoneModel.findByIdAndUpdate(
      timestoneId,
      { title, body, year, image }
    );
    res.satus(201).json({
      status: "success",
      message: "Timestones updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editTimestone;
