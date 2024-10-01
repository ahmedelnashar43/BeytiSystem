import * as XLSX from 'xlsx';

function exportToExcel(data) {
  try {
    console.log("Starting Excel export process...");
    console.log("Number of rows to export:", data.length);

    // Convert Date objects to strings in the format that Excel can recognize
    const processedData = data.map(row => ({
      ...row,
      timestamp: row.timestamp instanceof Date ? row.timestamp.toISOString() : row.timestamp
    }));

    console.log("Data processed for Excel. Sample row:", processedData[0]);

    const worksheet = XLSX.utils.json_to_sheet(processedData);

    // Format the timestamp column as a date in Excel
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    const timestampCol = Object.keys(processedData[0]).indexOf('timestamp');
    for (let row = range.s.r + 1; row <= range.e.r; ++row) {
      const cell = XLSX.utils.encode_cell({r: row, c: timestampCol});
      if (worksheet[cell]) {
        worksheet[cell].z = XLSX.SSF._table[14];  // Date format: dd-mmm-yy
      }
    }

    console.log("Worksheet created and formatted");

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Lab Data");

    console.log("Writing file...");
    XLSX.writeFile(workbook, "lab_data.xlsx");
    console.log("File written successfully");

  } catch (error) {
    console.error("Error in exportToExcel function:", error);
    throw new Error(`Excel export failed: ${error.message}`);
  }
}

export { exportToExcel };
