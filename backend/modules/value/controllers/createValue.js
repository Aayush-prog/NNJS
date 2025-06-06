const mongoose = require("mongoose");
const createValue = async (req, res) => {
  const ValueModel = mongoose.model("Values");
  const { title, body, image } = req.body;
  try {
    const newValue = await ValueModel.create({ title, body, image });
    res.satus(201).json({
      status: "success",
      message: "Values created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createValue;
