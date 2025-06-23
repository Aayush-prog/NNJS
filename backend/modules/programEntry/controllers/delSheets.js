const fs = require("fs");
const path = require("path");

const delSheets = async (req, res) => {
  try {
    const { fileName } = req.body;
    console.log(fileName);
    if (!fileName) {
      return res.status(400).json({ message: "Filename is required" });
    }

    const sheetPath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "public",
      "excel",
      fileName
    );

    if (!fs.existsSync(sheetPath)) {
      return res.status(404).json({ message: "File not found" });
    }

    await fs.promises.unlink(sheetPath);
    console.log("done");
    res
      .status(200)
      .json({ message: `File "${fileName}" deleted successfully` });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ message: "Server error while deleting file" });
  }
};

module.exports = delSheets;
