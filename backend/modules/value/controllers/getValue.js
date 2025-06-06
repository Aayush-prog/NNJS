const mongoose = require("mongoose");
const getValue = async (req, res) => {
  const ValueModel = mongoose.model("Values");
  try {
    const Values = await ValueModel.find();
    res.satus(201).json({
      status: "success",
      message: "Values found successfully",
      data: Values,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getValue;
