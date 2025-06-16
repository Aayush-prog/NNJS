const mongoose = require("mongoose");
const path = require("path");
const editSubSection = async (req, res) => {
  const SubSectionModel = mongoose.model("SubSection");
  const { title, body } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
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
    res.status(200).json({
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
