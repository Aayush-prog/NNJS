const mongoose = require("mongoose");
const getStory = async (req, res) => {
  const StoryModel = mongoose.model("Story");
  try {
    const story = await StoryModel.find();
    res.status(200).json({
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
module.exports = getStory;
