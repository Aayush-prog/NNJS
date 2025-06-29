const mongoose = require("mongoose");
const path = require("path");
const deleteImage = require("../../../handlers/delImage");
const editStory = async (req, res) => {
  const StoryModel = mongoose.model("Story");
  const { author, text } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  const { storyId } = req.params;
  try {
    const story = await StoryModel.findById(storyId);
    if (!story) {
      return res.status(404).json({
        status: "error",
        message: "Story not found",
      });
    }
    let updatedStory;
    if (image) {
      deleteImage(story.image);
      updatedStory = await StoryModel.findByIdAndUpdate(storyId, {
        author,
        text,
        image,
      });
    } else {
      updatedStory = await StoryModel.findByIdAndUpdate(storyId, {
        author,
        text,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Story updated successfully",
      data: updatedStory,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editStory;
