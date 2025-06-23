const ExcelJS = require("exceljs");
const fs = require("fs-extra");
const path = require("path");

const EXCEL_DIR = path.join(__dirname, "..", "..", "..", "public", "excel");
fs.ensureDirSync(EXCEL_DIR);

const normalizeProgramName = (name) =>
  name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const entry = async (req, res) => {
  const {
    programName,
    name,
    designation,
    date,
    organization,
    branch,
    gender,
    address,
    email,
    phone,
  } = req.body;

  const photo = req.file;
  const signatureBase64 = req.body.signature.split(";base64,").pop();
  const now = new Date();
  const time = now.toLocaleTimeString();
  const todaySheetName = date;
  const program = normalizeProgramName(programName);
  const filePath = path.join(EXCEL_DIR, `${program}.xlsx`);

  const workbook = new ExcelJS.Workbook();
  let sheet;

  if (fs.existsSync(filePath)) {
    await workbook.xlsx.readFile(filePath);
    sheet = workbook.getWorksheet(todaySheetName);
  }

  if (!sheet) {
    sheet = workbook.addWorksheet(todaySheetName);
  }

  sheet.columns = [
    { header: "Name", key: "name", width: 20 },
    { header: "Designation", key: "designation", width: 20 },
    { header: "Organization", key: "organization", width: 20 },
    { header: "Branch", key: "branch", width: 20 },
    { header: "Gender", key: "gender", width: 10 },
    { header: "Address", key: "address", width: 30 },
    { header: "Email", key: "email", width: 25 },
    { header: "Phone", key: "phone", width: 15 },
    { header: "Date", key: "date", width: 15 },
    { header: "Time", key: "time", width: 15 },
    { header: "Photo", key: "photo", width: 15 },
    { header: "Signature", key: "signature", width: 15 },
  ];

  // Save images to temp files
  const photoPath = path.join(EXCEL_DIR, "temp_photo.png");
  const sigPath = path.join(EXCEL_DIR, "temp_signature.png");

  fs.writeFileSync(photoPath, photo.buffer);
  fs.writeFileSync(sigPath, Buffer.from(signatureBase64, "base64"));

  // Add images to workbook
  const photoId = workbook.addImage({
    filename: photoPath,
    extension: "png",
  });

  const sigId = workbook.addImage({
    filename: sigPath,
    extension: "png",
  });

  // Add row data
  const newRow = sheet.addRow({
    name,
    designation,
    organization,
    branch,
    gender,
    address,
    email,
    phone,
    date,
    time,
  });

  const rowIndex = newRow.number;
  const photoHeightPx = 150;

  sheet.getRow(rowIndex).height = photoHeightPx / 1.33;

  sheet.addImage(photoId, {
    tl: { col: 10, row: rowIndex - 1 }, // photo column index
    ext: { width: 100, height: 100 },
  });

  sheet.addImage(sigId, {
    tl: { col: 11, row: rowIndex - 1 }, // signature column index
    ext: { width: 100, height: 50 },
  });

  // Save workbook and clean temp
  await workbook.xlsx.writeFile(filePath);
  fs.removeSync(photoPath);
  fs.removeSync(sigPath);

  res.json({ message: "Submitted and appended to Excel." });
};

module.exports = entry;
