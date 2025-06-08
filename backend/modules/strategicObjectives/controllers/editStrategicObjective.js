const mongoose = require("mongoose");
const editStrategicObjective = async (req, res) => {
  const StrategicObjectiveModel = mongoose.model("StrategicObjectives");
  const { title, body, image } = req.body;
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
    const updatedStrategicObjective =
      await StrategicObjectiveModel.findByIdAndUpdate(strategicObjectiveId, {
        title,
        body,
        image,
      });
    res.satus(201).json({
      status: "success",
      message: "StrategicObjectives updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editStrategicObjective;
