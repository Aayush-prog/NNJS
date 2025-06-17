const mongoose = require("mongoose");
const path = require("path");
const editMission = async (req, res) => {
  const MissionModel = mongoose.model("Mission");
  const { icon, title, body } = req.body;
  
  const { missionId } = req.params;
  try {
    const mission = await MissionModel.findById(missionId);
    if (!mission) {
      return res.status(404).json({
        status: "error",
        message: "Mission not found",
      });
    }
    const updatedMission = await MissionModel.findByIdAndUpdate(missionId, {
      icon, 
      title,
      body,
    });
    res.satus(201).json({
      status: "success",
      message: "Mission updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editMission;
