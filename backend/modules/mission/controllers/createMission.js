const mongoose = require("mongoose");
const path = require("path");
const createMission = async (req, res) => {
  const MissionModel = mongoose.model("Mission");
  const { body } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  try {
    const newMission = await MissionModel.create({ image, body });
    res.status(201).json({
      status: "success",
      message: "Mission created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createMission;
