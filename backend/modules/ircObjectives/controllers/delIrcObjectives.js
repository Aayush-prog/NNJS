const mongoose = require("mongoose");
const delIrcObjective = async (req, res) => {
  const IrcObjectiveModel = mongoose.model("IrcObjectives");
  const { ircObjectiveId } = req.params;
  try {
    const ircObjective = await IrcObjectiveModel.findById(ircObjectiveId);
    if (!ircObjective) {
      return res.status(404).json({
        status: "error",
        message: "Irc Objectives not found",
      });
    }
    const deletedIrcObjective = await IrcObjectiveModel.findByIdAndDelete(
      ircObjectiveId
    );
    res.status(200).json({
      status: "success",
      message: "Irc Objectives deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delIrcObjective;
