const mongoose = require("mongoose");
const deleteImage = require("../../../handlers/delImage");
const delStory = async (req, res) => {
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
    const deletedStory = await StoryModel.findByIdAndDelete(storyId);
    deleteImage(story.image);
    res.status(200).json({
      status: "success",
      message: "Story deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delStory;
