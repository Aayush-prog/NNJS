const mongoose = require("mongoose");
const getStaffById = async (req, res) => {
  const FounderModel = mongoose.model("Staffs");
  const { staffId } = req.params;
  try {
    const staff = await FounderModel.findById(staffId);
    if (!staff) {
      return res.status(404).json({
        status: "error",
        message: "Staffs not found",
      });
    }
    res.satus(201).json({
      status: "success",
      message: "Staffs found successfully",
      data: staff,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getStaffById;
