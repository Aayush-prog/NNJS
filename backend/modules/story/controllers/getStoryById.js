const mongoose = require("mongoose");
const getStoryById = async (req, res) => {
  const StoryModel = mongoose.model("Story");
  const { storyId } = req.params;
  try {
    const story = await StoryModel.findById(storyId);
    if (!story) {
      return res.status(404).json({
        status: "error",
        message: "Story not found",
      });
    }
    res.satus(201).json({
      status: "success",
      message: "Story found successfully",
      data: story,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getStoryById;
