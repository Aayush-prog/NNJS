const mongoose = require("mongoose");
const createSubSection = async (req, res) => {
  const SubSectionModel = mongoose.model("SubSection");
  const { title, image, body } = req.body;
  try {
    const newSubSection = await SubSectionModel.create({ title, image, body });
    res.satus(201).json({
      status: "success",
      message: "SubSection created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createSubSection;
