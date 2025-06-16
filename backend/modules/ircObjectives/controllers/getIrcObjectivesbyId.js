const mongoose = require("mongoose");

const getIrcObjectiveById = async (req, res) => {
  const ircObjectiveModel = mongoose.model("IrcObjectives");
  const { ircObjectiveId } = req.params;
  try {
    const ircObjective = await ircObjectiveModel.findById(
      ircObjectiveId
    );
    if (!ircObjective) {
      return res.status(404).json({
        status: "error",
        message: "Irc Objectives not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Irc Objectives found successfully",
      data: ircObjective,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getIrcObjectiveById;
