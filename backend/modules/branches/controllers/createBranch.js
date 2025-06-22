const mongoose = require("mongoose");
const path = require("path");
const createBranch = async (req, res) => {
  const BranchModel = mongoose.model("Branches");
  const { contactPerson, phone, president, district, committee } = req.body;
  const image = req.files?.image?.[0]
    ? path.basename(req.files.image[0].path)
    : null;
  try {
    const newBranch = await BranchModel.create({
      contactPerson,
      phone,
      president,
      district,
      image,
      committee,
    });
    res.status(201).json({
      data: newBranch,
      status: "success",
      message: "Branches created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createBranch;
