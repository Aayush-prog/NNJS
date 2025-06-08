const mongoose = require("mongoose");
const createHero = async (req, res) => {
  const HeroModel = mongoose.model("Hero");
  const { title, image, body } = req.body;
  try {
    const newHero = await HeroModel.create({
      title,
      image,
      body,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createHero;
