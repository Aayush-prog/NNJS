const mongoose = require("mongoose");
const path = require("path");
const editPerson = async (req, res) => {
  const PersonModel = mongoose.model("Person");
  const { name, designation, body, duration, type } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  const { personId } = req.params;
  try {
    const person = await PersonModel.findById(personId);
    if (!person) {
      return res.status(404).json({
        status: "error",
        message: "Person not found",
      });
    }
    const updatedPerson = await PersonModel.findByIdAndUpdate(personId, {
      name,
      designation,
      body,
      duration,
      image,
      type,
    });
    res.status(200).json({
      status: "success",
      message: "Person updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editPerson;
