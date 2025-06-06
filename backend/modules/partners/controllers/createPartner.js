const mongoose = require("mongoose");
const createPartner = async (req, res) => {
  const PartnerModel = mongoose.model("Partners");
  const { name, image, type } = req.body;
  try {
    const newPartner = await PartnerModel.create({ name, image, type });
    res.satus(201).json({
      status: "success",
      message: "Partners created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createPartner;
