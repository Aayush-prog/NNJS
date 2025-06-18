const mongoose = require("mongoose");
const editBank = async (req, res) => {
  const BankModel = mongoose.model("Bank");
  const { accName, accNum, bank, swiftCode } = req.body;
  const { bankId } = req.params;
  try {
    const bankFound = await BankModel.findById(bankId);
    if (!bankFound) {
      return res.status(404).json({
        status: "error",
        message: "Bank not found",
      });
    }
    const updatedBank = await BankModel.findByIdAndUpdate(bankId, {
      accName,
      accNum,
      bank,
      swiftCode,
    });
    res
      .status(200)
      .json({ status: "success", message: "Bank updated successfully" });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editBank;
