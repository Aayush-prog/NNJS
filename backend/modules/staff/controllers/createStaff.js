const mongoose = require("mongoose");
const createStaff = async (req, res) => {
  const PersonModel = mongoose.model("Person");
  const StaffModel = mongoose.model("Staff");
  const {} = req.body;
  try {
    const newPerson = await PersonModel.create({});

    const newStaff = await StaffModel.create({ newPerson });
    res.satus(201).json({
      status: "success",
      message: "Person created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createStaff;
