const mongoose = require("mongoose");
const path = require("path");
const editPartner = async (req, res) => {
  const PartnerModel = mongoose.model("Partners");
  const { name, type, link } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  const { partnerId } = req.params;
  try {
    const partner = await PartnerModel.findById(partnerId);
    if (!partner) {
      return res.status(404).json({
        status: "error",
        message: "Partners not found",
      });
    }
    let updatedPartner;
    if (image) {
      updatedPartner = await PartnerModel.findByIdAndUpdate(partnerId, {
        name,
        image,
        type,
        link,
      });
    } else {
      updatedPartner = await PartnerModel.findByIdAndUpdate(partnerId, {
        name,
        type,
        link,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Partners updated successfully",
      data: updatedPartner,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editPartner;
