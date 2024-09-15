// Function to handle dropdown change and display form based on selection
function handleSelectChange(event) {
    // Hide all forms
    document.getElementById('form1').classList.add('hidden');
    document.getElementById('form2').classList.add('hidden');
    document.getElementById('form3').classList.add('hidden');
    document.getElementById('form4').classList.add('hidden');
    
    // Get the selected value from the dropdown
    var selectedValue = event.target.value;
  
    // Show the corresponding form if a valid option is selected
    if (selectedValue !== "0") {
      document.getElementById(selectedValue).classList.remove('hidden');
    }
  }
  
  // Add event listeners to all select elements
  document.getElementById('selectProduct1').addEventListener('change', handleSelectChange);
  document.getElementById('selectProduct2').addEventListener('change', handleSelectChange);
  document.getElementById('selectProduct3').addEventListener('change', handleSelectChange);
  document.getElementById('selectProduct4').addEventListener('change', handleSelectChange);
  