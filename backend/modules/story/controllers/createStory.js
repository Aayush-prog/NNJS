const mongoose = require("mongoose");
const createStory = async (req, res) => {
  const StoryModel = mongoose.model("Story");
  const { author, text, image } = req.body;
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
