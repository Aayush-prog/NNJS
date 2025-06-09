const mongoose = require("mongoose");
const editSpecificObjective = async (req, res) => {
  const SpecificObjectiveModel = mongoose.model("SpecificObjectives");
  const { title, objectives } = req.body;
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
    const updatedSpecificObjective =
      await SpecificObjectiveModel.findByIdAndUpdate(specificObjectiveId, {
        title,
        objectives,
      });
    res.status(200).json({
      status: "success",
      message: "SpecificObjectives updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editSpecificObjective;
