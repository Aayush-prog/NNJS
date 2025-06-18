const mongoose = require("mongoose");
const path = require("path");

const createIrcObjectives = async (req, res) => {
  const IrcObjectiveModel = mongoose.model("IrcObjectives");
  const { title, description, icon, color } = req.body;

  try {
    const newIrcObjective = await IrcObjectiveModel.create({
      title,
      description,
      icon,
      color,
    });
    res.status(201).json({
      status: "success",
      message: "Irc Objectives created successfully",
      data: newIrcObjective,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createIrcObjectives;
