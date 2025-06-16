const mongoose = require("mongoose");
const path = require("path");

const editIrcObjectives = async (req, res) => {
  const IrcObjectivesModel = mongoose.model("IrcObjectives");
  const { title, description, icon, color } = req.body;
  
  const { ircObjectiveId } = req.params;
  try {
    const ircObjective = await IrcObjectivesModel.findById(
      ircObjectiveId
    );
    if (!ircObjective) {
      return res.status(404).json({
        status: "error",
        message: "Irc Objectives not found",
      });
    }
    const updatedStrategicObjective =
      await IrcObjectivesModel.findByIdAndUpdate(ircObjectiveId, {
        title,
        description,
        icon,
        color,
      });
    res.status(201).json({
      status: "success",
      message: "Irc Objectives updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editIrcObjectives;
