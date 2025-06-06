const mongoose = require("mongoose");
const getContact = async (req, res) => {
  const COntactModel = mongoose.model("Contact");
  try {
    const contact = await COntactModel.find();
    res.satus(201).json({
      status: "success",
      message: "Contact found successfully",
      data: contact,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getContact;
