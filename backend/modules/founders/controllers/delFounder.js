const mongoose = require("mongoose");
const delFounder = async (req, res) => {
  const FounderModel = mongoose.model("Founders");
  const PersonModel = mongoose.model("Person");
  const {} = req.body;
  const { founderId } = req.params;
  try {
    const founder = await FounderModel.findById(founderId);
    if (!founder) {
      return res.status(404).json({
        status: "error",
        message: "Founders not found",
      });
    }
    const delFounder = await FounderModel.findByIdAndDelete(founderId);
    const delPerson = await PersonModel.findByIdAndDelete(delFounder._id);
    res.satus(201).json({
      status: "success",
      message: "Founders deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delFounder;
