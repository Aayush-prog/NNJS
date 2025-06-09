const mongoose = require("mongoose");
const path = require("path");
const createStrategicObjectives = async (req, res) => {
  const StrategicObjectiveModel = mongoose.model("StrategicObjectives");
  const { title, body, icon, color, bg } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  try {
    const newStrategicObjective = await StrategicObjectiveModel.create({
      title,
      body,
      image,
      icon,
      color,
      bg,
    });
    res.status(201).json({
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
