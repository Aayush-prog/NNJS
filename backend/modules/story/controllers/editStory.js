const mongoose = require("mongoose");
const editStory = async (req, res) => {
  const StoryModel = mongoose.model("Story");
  const { author, text, image } = req.body;
  const { storyId } = req.params;
  try {
    const story = await StoryModel.findById(storyId);
    if (!story) {
      return res.status(404).json({
        status: "error",
        message: "Story not found",
      });
    }
    const updatedStory = await StoryModel.findByIdAndUpdate(storyId, {
      author,
      text,
      image,
    });
    res.satus(201).json({
      status: "success",
      message: "Story updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editStory;
