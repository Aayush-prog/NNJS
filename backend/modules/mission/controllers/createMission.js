const mongoose = require("mongoose");
const createMission = async (req, res) => {
  const MissionModel = mongoose.model("Mission");
  const { image, body } = req.body;
  try {
    const newMission = await MissionModel.create({ image, body });
    res.satus(201).json({
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
