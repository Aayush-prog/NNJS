const mongoose = require("mongoose");
const path = require("path");
const editHero = async (req, res) => {
  const HeroModel = mongoose.model("Hero");
  const { title, body } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  const { heroId } = req.params;
  try {
    const hero = await HeroModel.findById(heroId);
    if (!hero) {
      return res.status(404).json({
        status: "error",
        message: "Hero not found",
      });
    }
    const updatedHero = await HeroModel.findByIdAndUpdate(heroId, {
      title,
      image,
      body,
    });
    res.satus(201).json({
      status: "success",
      message: "Hero updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editHero;
