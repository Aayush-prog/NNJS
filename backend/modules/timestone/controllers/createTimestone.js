const mongoose = require("mongoose");
const path = require("path");
const createTimestone = async (req, res) => {
  const TimestoneModel = mongoose.model("Timestones");
  const { title, body, year } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  try {
    const newTimestone = await TimestoneModel.create({
      title,
      body,
      year,
      image,
    });
    res.status(201).json({
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
