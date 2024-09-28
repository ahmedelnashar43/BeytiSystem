// excelExport.js
function exportToExcel(data) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Lab Data");
    XLSX.writeFile(workbook, "lab_data.xlsx");
  }
  
  export { exportToExcel }; // Export the function for use in other files
  