const mongoose = require("mongoose");
const delSpecificObjective = async (req, res) => {
  const SpecificObjectiveModel = mongoose.model("SpecificObjectives");
  const {} = req.body;
  const { specificObjectiveId } = req.params;
  try {
    const specificObjective = await SpecificObjectiveModel.findById(
      specificObjectiveId
    );
    if (!specificObjective) {
      return res.status(404).json({
        status: "error",
        message: "SpecificObjectives not found",
      });
    }
    const deletedSpecificObjective =
      await SpecificObjectiveModel.findByIdAndDelete(specificObjectiveId);
    res.status(200).json({
      status: "success",
      message: "SpecificObjectives deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delSpecificObjective;
