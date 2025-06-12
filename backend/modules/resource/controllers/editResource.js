const mongoose = require("mongoose");
const editResource = async (req, res) => {
  const ResourceModel = mongoose.model("Resources");
  const { title, body, link, type } = req.body;
  const { resourceId } = req.params;
  const file = req.files?.file?.[0]
    ? path.basename(req.files.file[0].path)
    : null;
  try {
    const resource = await ResourceModel.findById(resourceId);
    if (!resource) {
      return res.status(404).json({
        status: "error",
        message: "Resources not found",
      });
    }
    const updatedResource = await ResourceModel.findByIdAndUpdate(resourceId, {
      title,
      body,
      link,
      type,
      file,
    });
    res.status(200).json({
      status: "success",
      message: "Resources updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editResource;
