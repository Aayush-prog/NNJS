const mongoose = require("mongoose");
const delStaff = async (req, res) => {
  const StaffModel = mongoose.model("Staffs");
  const PersonModel = mongoose.model("Person");
  const {} = req.body;
  const { staffId } = req.params;
  try {
    const staff = await StaffModel.findById(staffId);
    if (!staff) {
      return res.status(404).json({
        status: "error",
        message: "Staffs not found",
      });
    }
    const delStaff = await StaffModel.findByIdAndDelete(staffId);
    const delPerson = await PersonModel.findByIdAndDelete(delStaff._id);
    res.satus(201).json({
      status: "success",
      message: "Staffs deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delStaff;
