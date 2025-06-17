const mongoose = require("mongoose");
const delStrategicObjective = async (req, res) => {
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
    const deletedStrategicObjective =
      await StrategicObjectiveModel.findByIdAndDelete(strategicObjectiveId);
    res.status(200).json({
      status: "success",
      message: "StrategicObjectives deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delStrategicObjective;
