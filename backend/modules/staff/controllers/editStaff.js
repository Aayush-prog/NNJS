const mongoose = require("mongoose");
const editStaff = async (req, res) => {
  const StaffModel = mongoose.model("Staffs");
  const {} = req.body;
  const { staffId } = req.params;
  try {
    const staffId = await StaffModel.findById(staffId);
    if (!staffId) {
      return res.status(404).json({
        status: "error",
        message: "Staffs not found",
      });
    }
    const updatedStaff = await StaffModel.findByIdAndUpdate(staffId, {});
    res.satus(201).json({
      status: "success",
      message: "Staffs updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editStaff;
