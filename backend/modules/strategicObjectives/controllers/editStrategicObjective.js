const mongoose = require("mongoose");
const path = require("path");
const editStrategicObjective = async (req, res) => {
  const StrategicObjectiveModel = mongoose.model("StrategicObjectives");
  const { title, body, icon, color, bg } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
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
        icon,
        color,
        bg,
      });
    res.status(200).json({
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
