const mongoose = require("mongoose");
const getBank = async (req, res) => {
  const BankModel = mongoose.model("Bank");
  try {
    const bank = await BankModel.find();
    if (!bank) {
      return res.status(404).json({
        status: "error",
        message: "Bank not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Bank updated successfully",
      data: bank[0],
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = getBank;
