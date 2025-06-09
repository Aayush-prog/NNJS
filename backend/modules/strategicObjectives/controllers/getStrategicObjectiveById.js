const mongoose = require("mongoose");
const getStrategicObjectiveById = async (req, res) => {
  const StrategicObjectiveModel = mongoose.model("StrategicObjectives");
  const { strategicObjectiveId } = req.params;
  try {
    const strategicObjective = await StrategicObjectiveModel.findById(
      strategicObjectiveId
    );
    if (!strategicObjective) {
      return res.status(404).json({
        status: "error",
        message: "StrategicObjectives not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "StrategicObjectives found successfully",
      data: strategicObjective,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getStrategicObjectiveById;
