const mongoose = require("mongoose");
const getPerson = async (req, res) => {
  const PersonModel = mongoose.model("Person");
  try {
    const past = await PersonModel.find({ type: "Past" });
    const current = await PersonModel.find({ type: "Current" });
    const founder = await PersonModel.find({ type: "Founder" });
    res.satus(201).json({
      status: "success",
      message: "Person found successfully",
      past,
      current,
      founder,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getPerson;
