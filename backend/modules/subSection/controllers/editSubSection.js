const mongoose = require("mongoose");
const editSubSection = async (req, res) => {
  const SubSectionModel = mongoose.model("SubSection");
  const { title, image, body } = req.body;
  const { subSectionId } = req.params;
  try {
    const subSection = await SubSectionModel.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        status: "error",
        message: "SubSection not found",
      });
    }
    const updatedSubSection = await SubSectionModel.findByIdAndUpdate(
      subSectionId,
      { title, image, body }
    );
    res.satus(201).json({
      status: "success",
      message: "SubSection updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editSubSection;
