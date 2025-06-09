const mongoose = require("mongoose");
const getSpecificObjectives = async (req, res) => {
  const SpecificObjectiveModel = mongoose.model("SpecificObjectives");
  try {
    const specificObjective = await SpecificObjectiveModel.find();
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
module.exports = getSpecificObjectives;
