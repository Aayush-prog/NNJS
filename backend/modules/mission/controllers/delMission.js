const mongoose = require("mongoose");
const delMission = async (req, res) => {
  const MissionModel = mongoose.model("Mission");
  const {} = req.body;
  const { missionId } = req.params;
  try {
    const mission = await MissionModel.findById(missionId);
    if (!mission) {
      return res.status(404).json({
        status: "error",
        message: "Mission not found",
      });
    }
    const deletedMission = await MissionModel.findByIdAndDelete(missionId);
    res.satus(201).json({
      status: "success",
      message: "Mission deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delMission;
