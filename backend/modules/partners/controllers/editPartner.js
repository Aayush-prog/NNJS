const mongoose = require("mongoose");
const editPartner = async (req, res) => {
  const PartnerModel = mongoose.model("Partners");
  const { name, image, type } = req.body;
  const { partnerId } = req.params;
  try {
    const partner = await PartnerModel.findById(partnerId);
    if (!partner) {
      return res.status(404).json({
        status: "error",
        message: "Partners not found",
      });
    }
    const updatedPartner = await PartnerModel.findByIdAndUpdate(partnerId, {
      name,
      image,
      type,
    });
    res.satus(201).json({
      status: "success",
      message: "Partners updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editPartner;
