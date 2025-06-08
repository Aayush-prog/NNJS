const mongoose = require("mongoose");
const editHero = async (req, res) => {
  const HeroModel = mongoose.model("Hero");
  const { title, image, body } = req.body;
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
