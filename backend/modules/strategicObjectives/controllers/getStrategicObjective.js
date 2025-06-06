const mongoose = require("mongoose");
const getStrategicObjective = async (req, res) => {
  const StrategicObjectiveModel = mongoose.model("StrategicObjectives");
  try {
    const strategicObjective = await StrategicObjectiveModel.find();
    res.satus(201).json({
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
module.exports = getStrategicObjective;
