const fs = require("fs");
const path = require("path");
const EXCEL_DIR = path.join(__dirname, "..", "..", "..", "public", "excel");

const getSheets = async (req, res) => {
  try {
    if (!fs.existsSync(EXCEL_DIR)) {
      return res.status(404).json({ message: "Excel directory not found" });
    }

    const files = await fs.promises.readdir(EXCEL_DIR);
    console.log(files);
    res.status(200).json({ data: files });
  } catch (error) {
    console.error("Error reading Excel directory:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getSheets;
