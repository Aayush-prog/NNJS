const mongoose = require("mongoose");
const delTimestone = async (req, res) => {
  const TimestoneModel = mongoose.model("Timestones");
  const {} = req.body;
  const { timestoneId } = req.params;
  try {
    const timestone = await TimestoneModel.findById(timestoneId);
    if (!timestone) {
      return res.status(404).json({
        status: "error",
        message: "Timestones not found",
      });
    }
    const deletedEyeCareCenter = await TimestoneModel.findByIdAndDelete(
      timestoneId
    );
    res.satus(201).json({
      status: "success",
      message: "Timestones deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delTimestone;
