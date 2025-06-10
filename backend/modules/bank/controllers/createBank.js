const mongoose = require("mongoose");
const createBank = async (req, res) => {
  const BankModel = mongoose.model("Bank");
  const { accName, accNum, bank, swiftCode } = req.body;
  try {
    const newBank = await BankModel.create({
      accName,
      accNum,
      bank,
      swiftCode,
    });
    res
      .status(201)
      .json({ status: "success", message: "Bank created successfully" });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = createBank;
