const mongoose = require("mongoose");
const getPartners = async (req, res) => {
  const PartnerModel = mongoose.model("Partners");
  try {
    const partner = await PartnerModel.find();
    res.satus(201).json({
      status: "success",
      message: "Partners found successfully",
      data: partner,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getPartners;
