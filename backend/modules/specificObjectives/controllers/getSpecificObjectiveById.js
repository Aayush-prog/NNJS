const mongoose = require("mongoose");
const getSpecificObjectiveById = async (req, res) => {
  const SpecificObjectiveModel = mongoose.model("SpecificObjectives");
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
    res.status(200).json({
      status: "success",
      message: "SpecificObjectives found successfully",
      data: specificObjective,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getSpecificObjectiveById;
