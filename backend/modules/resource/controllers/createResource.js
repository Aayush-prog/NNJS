const mongoose = require("mongoose");
const createResource = async (req, res) => {
  const ResourceModel = mongoose.model("Resoures");
  const { title, body, link, type } = req.body;
  try {
    const newResource = await ResourceModel.create({ title, body, link });
    res.satus(201).json({
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
