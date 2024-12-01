// controllers/controller.js
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Path to the Excel file
const filePath = path.join(__dirname, '../data.xlsx');

// Function to parse the Excel file
function parseExcelData() {
  try {
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error('Excel file not found');
    }

    // Read the Excel file
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    return data;
  } catch (error) {
    console.error('Error reading or parsing the Excel file:', error);
    return [];
  }
}

// Controller function to send the parsed data as a response
const getExcelData = (req, res) => {
  const data = parseExcelData();
  res.json(data);
};

module.exports = {
  getExcelData,
};
