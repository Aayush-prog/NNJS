const mongoose = require("mongoose");
const createStrategicObjectives = async (req, res) => {
  const StrategicObjectiveModel = mongoose.model("StrategicObjectives");
  const { title, body, image } = req.body;
  try {
    const newStrategicObjective = await StrategicObjectiveModel.create({
      title,
      body,
      image,
    });
    res.satus(201).json({
      status: "success",
      message: "StrategicObjectives created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createStrategicObjectives;
