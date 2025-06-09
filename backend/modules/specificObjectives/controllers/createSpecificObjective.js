const mongoose = require("mongoose");
const createSpecificObjective = async (req, res) => {
  const SpecificObjectiveModel = mongoose.model("SpecificObjectives");
  const { title, objectives } = req.body;
  try {
    const newSpecificObjective = await SpecificObjectiveModel.create({
      title,
      objectives,
    });
    res.status(201).json({
      status: "success",
      message: "SpecificObjectives created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createSpecificObjective;
