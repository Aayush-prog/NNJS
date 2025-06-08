const mongoose = require("mongoose");
const createFounder = async (req, res) => {
  const PersonModel = mongoose.model("Person");
  const FounderModel = mongoose.model("Founder");
  const { name, designation, body, image, duration } = req.body;
  try {
    const newPerson = await PersonModel.create({
      name,
      designation,
      body,
      image,
      duration,
    });

    const newFounder = await FounderModel.create({ people: [newPerson] });
    res.satus(201).json({
      status: "success",
      message: "Person created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createFounder;
