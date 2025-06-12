const mongoose = require("mongoose");
const getPartners = async (req, res) => {
  const PartnerModel = mongoose.model("Partners");
  try {
    const past = await PartnerModel.find({ type: "Past" });
    const current = await PartnerModel.find({ type: "Current" });
    res.status(200).json({
      status: "success",
      message: "Partners found successfully",
      past,
      current,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getPartners;
