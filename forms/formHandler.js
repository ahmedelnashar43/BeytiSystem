// formHandler.js
import { db } from './firebaseConfig.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Attach submitFormData to the window object
window.submitFormData = async function() {
    // Get values from the form inputs
    const shift = document.getElementById("Shift").value;
    const productType = document.getElementById("productType").value; // Product type input
    const sampleCondition = document.getElementById("SampleCondition").value;
    const analyst = document.getElementById("analystInput").value;

    // Convert input values to numbers and handle NaN cases
    const ph = parseFloat(document.getElementById("phInput").value) || 0; // Default to 0 if NaN
    const acidity = parseFloat(document.getElementById("acidityInput").value) || 0; // Default to 0 if NaN
    const density = parseFloat(document.getElementById("densityInput").value) || 0; // Default to 0 if NaN
    const temp = parseFloat(document.getElementById("tempInput").value) || 5; // Default to 5 if NaN
    const spGr = parseFloat(document.getElementById("spGrInput").value) || 0; // Default to 0 if NaN
    const fat = parseFloat(document.getElementById("fatInput").value) || 0; // Default to 0 if NaN
    const snf = parseFloat(document.getElementById("snfInput").value) || 0; // Default to 0 if NaN
    const ts = parseFloat(document.getElementById("tsInput").value) || 0; // Default to 0 if NaN
    const protein = parseFloat(document.getElementById("proteinInput").value) || 0; // Default to 0 if NaN

    // Log the collected data for debugging
    console.log("Submitting Form Data:", {
        shift,
        productType,
        sampleCondition,
        analyst,
        ph,
        acidity,
        density,
        temp,
        spGr,
        fat,
        snf,
        ts,
        protein
    });

    try {
        await addDoc(collection(db, "chemicallab"), {
            shift,
            productType,
            sampleCondition,
            analyst,
            ph,
            acidity,
            density,
            temp,
            spGr,
            fat,
            snf,
            ts,
            protein,
            timestamp: serverTimestamp()  // Automatically capture the timestamp
        });

        // Show success notification
        showNotification("Form data submitted successfully!", "success");

    } catch (error) {
        console.error("Error saving document: ", error);
        alert("Error: " + error.message);  // Alert the error message
        showNotification("There was an error submitting the form data.", "error");
    }
};



// Function to show a notification
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;

    // Apply different styles based on the type
    if (type === 'success') {
        notification.classList.remove('error');
        notification.classList.add('success');
    } else if (type === 'error') {
        notification.classList.remove('success');
        notification.classList.add('error');
    }

    // Show notification
    notification.classList.remove('hidden');
    notification.classList.add('show');

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hidden');
    }, 3000);
}

// Function to open confirmation modal
window.openConfirmationModal = function() {
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    confirmationModal.show();
};

// Confirm submission event
document.getElementById('confirmSubmitBtn').addEventListener('click', async () => {
    await submitFormData();
    const confirmationModal = bootstrap.Modal.getInstance(document.getElementById('confirmationModal'));
    confirmationModal.hide();  // Close the modal after submission
});

// Function to reset form fields
window.resetdatafields = function() {
    console.log('Reset button clicked'); // Debugging message
    const form = document.getElementById('form1');  // Ensure this ID matches your form ID
    if (form) {
        // Reset all input fields in the form
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (input.tagName.toLowerCase() === 'input') {
                input.value = '';  // Reset input fields
            } else if (input.tagName.toLowerCase() === 'select') {
                input.selectedIndex = 0;  // Reset select elements
            }
        });
        console.log('Form fields reset'); // Debugging message
    } else {
        console.error('Form not found!');
    }
};

// Function to show form based on dropdown selection
function showForm() {
    // Hide all forms initially
    const forms = document.querySelectorAll('[id^="form"]');
    forms.forEach(form => form.classList.add('hidden'));

    // Get selected values from dropdowns
    const selectedProduct1 = document.getElementById('selectProduct1').value;
    const selectedProduct2 = document.getElementById('selectProduct2').value;
    const selectedProduct3 = document.getElementById('selectProduct3').value;
    const selectedProduct4 = document.getElementById('selectProduct4').value;

    // Show the corresponding form based on the selected product
    let formDisplayed = false;

    if (selectedProduct1 !== "0") {
        document.getElementById(selectedProduct1).classList.remove('hidden');
        formDisplayed = true;
    }
    if (selectedProduct2 !== "0") {
        document.getElementById(selectedProduct2).classList.remove('hidden');
        formDisplayed = true;
    }
    if (selectedProduct3 !== "0") {
        document.getElementById(selectedProduct3).classList.remove('hidden');
        formDisplayed = true;
    }
    if (selectedProduct4 !== "0") {
        document.getElementById(selectedProduct4).classList.remove('hidden');
        formDisplayed = true;
    }

    // Reset dropdowns to default "Choose..." if any form is displayed
    if (formDisplayed) {
        resetDropdowns();
    }
}

// Function to reset dropdowns
function resetDropdowns() {
    const dropdowns = [
        document.getElementById('selectProduct1'),
        document.getElementById('selectProduct2'),
        document.getElementById('selectProduct3'),
        document.getElementById('selectProduct4')
    ];

    dropdowns.forEach(dropdown => {
        dropdown.value = "0";  // Reset to default option
    });
}

// Attach event listeners to dropdowns
document.getElementById('selectProduct1').addEventListener('change', showForm);
document.getElementById('selectProduct2').addEventListener('change', showForm);
document.getElementById('selectProduct3').addEventListener('change', showForm);
document.getElementById('selectProduct4').addEventListener('change', showForm);
