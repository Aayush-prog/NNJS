const mongoose = require("mongoose");
const path = require("path");
const createMission = async (req, res) => {
  const MissionModel = mongoose.model("Mission");
  const { icon, title, body } = req.body;
  try {
    const newMission = await MissionModel.create({ icon, title, body });
    res.status(201).json({
      status: "success",
      message: "Mission created successfully",
      data: newMission,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createMission;
