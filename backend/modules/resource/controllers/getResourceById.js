const mongoose = require("mongoose");
const getResourceById = async (req, res) => {
  const ResourceModel = mongoose.model("Resources");
  const { resourceId } = req.params;
  try {
    const resource = await ResourceModel.findById(resourceId);
    if (!resource) {
      return res.status(404).json({
        status: "error",
        message: "Resources not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Resources found successfully",
      data: resource,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getResourceById;
