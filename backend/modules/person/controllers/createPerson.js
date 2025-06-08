const mongoose = require("mongoose");
const createPerson = async (req, res) => {
  const Person = mongoose.model("Person");
  const { name, designation, body, duration, image, type } = req.body;
  try {
    const newPerson = await Person.create({
      name,
      designation,
      body,
      duration,
      image,
      type,
    });
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
module.exports = createPerson;
