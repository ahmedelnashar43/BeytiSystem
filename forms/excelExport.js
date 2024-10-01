import * as XLSX from 'xlsx';

function exportToExcel(data) {
  // Convert Date objects to strings in the format that Excel can recognize
  const processedData = data.map(row => ({
    ...row,
    timestamp: row.timestamp instanceof Date ? row.timestamp.toISOString() : row.timestamp
  }));

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

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Lab Data");
  XLSX.writeFile(workbook, "lab_data.xlsx");
}

export { exportToExcel };
