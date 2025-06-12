const mongoose = require("mongoose");
const path = require("path");
const createResource = async (req, res) => {
  const ResourceModel = mongoose.model("Resources");
  const { title, body, link, type } = req.body;
  const file = req.files?.file?.[0]
    ? path.basename(req.files.file[0].path)
    : null;
  try {
    const newResource = await ResourceModel.create({
      title,
      body,
      link,
      file,
      type,
    });
    res.status(201).json({
      status: "success",
      message: "Resoures created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createResource;
