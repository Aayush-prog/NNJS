const mongoose = require("mongoose");
const delBank = async (req, res) => {
  const BankModel = mongoose.model("Bank");
  const {} = req.body;
  const { bankId } = req.params;
  try {
    const bank = await JobModel.findById(bankId);
    if (!bank) {
      return res.status(404).json({
        status: "error",
        message: "Bank not found",
      });
    }
    const deletedBank = await BankModel.findByIdAndDelete(bankId);
    res
      .satus(201)
      .json({ status: "success", message: "Bank deleted successfully" });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message || error,
    });
  }
};
module.exports = delBank;
