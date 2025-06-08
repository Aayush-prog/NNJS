const mongoose = require("mongoose");
const path = require("path");
const createStory = async (req, res) => {
  const StoryModel = mongoose.model("Story");
  const { author, text } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  try {
    const newStory = await StoryModel.create({ author, text, image });
    res.satus(201).json({
      status: "success",
      message: "Story created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createStory;
