const mongoose = require("mongoose");
const deleteImage = require("../../../handlers/delImage");
const delPartner = async (req, res) => {
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
    const deletedPartner = await PartnerModel.findByIdAndDelete(partnerId);
    deleteImage(partner.image);
    res.status(200).json({
      status: "success",
      message: "Partners deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delPartner;
