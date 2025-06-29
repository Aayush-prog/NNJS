const mongoose = require("mongoose");
const path = require("path");
const createPartner = async (req, res) => {
  const PartnerModel = mongoose.model("Partners");
  const { name, type, link } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  try {
    const newPartner = await PartnerModel.create({ name, image, type, link });
    res.status(201).json({
      status: "success",
      message: "Partners created successfully",
      data: newPartner,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createPartner;
