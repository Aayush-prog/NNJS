const mongoose = require("mongoose");
const createTimestone = async (req, res) => {
  const TimestoneModel = mongoose.model("Timestones");
  const { title, body, year, image } = req.body;
  try {
    const newTimestone = await TimestoneModel.create({
      title,
      body,
      year,
      image,
    });
    res.satus(201).json({
      status: "success",
      message: "Timestones created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createTimestone;
