const mongoose = require("mongoose");
const getPartnerById = async (req, res) => {
  const PartnerModel = mongoose.model("Partners");
  const { partnerId } = req.params;
  try {
    const partner = await PartnerModel.findById(partnerId);
    if (!partner) {
      return res.status(404).json({
        status: "error",
        message: "Partners not found",
      });
    }
    res.status(200).json({
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
module.exports = getPartnerById;
