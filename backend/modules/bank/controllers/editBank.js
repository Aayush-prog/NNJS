const mongoose = require("mongoose");
const editBank = async (req, res) => {
  const BankModel = mongoose.model("Bank");
  const { accName, accNum, bank, swiftCode } = req.body;
  const { bankId } = req.params;
  try {
    const bank = await JobModel.findById(bankId);
    if (!bank) {
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
      .satus(201)
      .json({ status: "success", message: "Bank updated successfully" });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = editBank;
