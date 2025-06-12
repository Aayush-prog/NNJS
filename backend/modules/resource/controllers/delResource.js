const mongoose = require("mongoose");
const delResource = async (req, res) => {
  const ResourceModel = mongoose.model("Resources");
  const {} = req.body;
  const { resourceId } = req.params;
  try {
    const resource = await ResourceModel.findById(resourceId);
    if (!resource) {
      return res.status(404).json({
        status: "error",
        message: "Resources not found",
      });
    }
    const deletedResource = await ResourceModel.findByIdAndDelete(resourceId);
    res.status(200).json({
      status: "success",
      message: "Resources deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delResource;
