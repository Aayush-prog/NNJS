const mongoose = require("mongoose");

const getIrcObjective = async (req, res) => {
  const IrcObjectiveModel = mongoose.model("IrcObjectives");
  try {
    const irccObjective = await IrcObjectiveModel.find();
    res.status(200).json({
      status: "success",
      message: "Irc Objectives found successfully",
      data: irccObjective,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getIrcObjective;
