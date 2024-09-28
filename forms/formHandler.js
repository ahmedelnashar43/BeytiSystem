// formHandler.js
import { db } from './firebaseConfig.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// // Attach submitFormData to the window object
// window.submitFormData = async function() {
//     const shift = document.getElementById("Shift").value;
//     const sampleCondition = document.getElementById("SampleCondition").value;
//     const ph = document.getElementById("phInput").value;
//     const acidity = document.getElementById("acidityInput").value;
//     const density = document.getElementById("densityInput").value;
//     const temp = document.getElementById("tempInput").value;
//     const spGr = document.getElementById("spGrInput").value;
//     const fat = document.getElementById("fatInput").value;
//     const snf = document.getElementById("snfInput").value;
//     const ts = document.getElementById("tsInput").value;
//     const protein = document.getElementById("proteinInput").value;
//     // const status = document.getElementById("statusInput").value;
//     const analyst = document.getElementById("analystInput").value;

//     try {
//         await addDoc(collection(db, "labData"), {
//             shift,
//             sampleCondition,
//             ph,
//             acidity,
//             density,
//             temp,
//             spGr,
//             fat,
//             snf,
//             ts,
//             protein,
//             // status,
//             analyst,
//             timestamp: serverTimestamp()
//         });
//         alert("Form data submitted successfully!");
//     } catch (error) {
//         console.error("Error saving document: ", error);
//     }
// };


// Attach submitFormData to the window object
window.submitFormData = async function() {
    const shift = document.getElementById("Shift").value;
    const sampleCondition = document.getElementById("SampleCondition").value;
    const ph = document.getElementById("phInput").value;
    const acidity = document.getElementById("acidityInput").value;
    const density = document.getElementById("densityInput").value;
    const temp = document.getElementById("tempInput").value;
    const spGr = document.getElementById("spGrInput").value;
    const fat = document.getElementById("fatInput").value;
    const snf = document.getElementById("snfInput").value;
    const ts = document.getElementById("tsInput").value;
    const protein = document.getElementById("proteinInput").value;
    // const status = document.getElementById("statusInput").value;
    const analyst = document.getElementById("analystInput").value;

    try {
        await addDoc(collection(db, "labData"), {
            shift,
            sampleCondition,
            ph,
            acidity,
            density,
            temp,
            spGr,
            fat,
            snf,
            ts,
            protein,
            // status,
            analyst,
            timestamp: serverTimestamp()
        });

        // Show success notification
        showNotification("Form data submitted successfully!", "success");

    } catch (error) {
        console.error("Error saving document: ", error);

        // Show error notification if submission fails
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
    confirmationModal.hide(); // Close the modal after submission
});




// Function to reset form fields
window.resetdatafields = function() {
    console.log('Reset button clicked'); // Debugging message
    const form = document.getElementById('form1'); // Ensure this ID matches your form ID
    if (form) {
        // Reset all input fields in the form
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (input.tagName.toLowerCase() === 'input') {
                input.value = ''; // Reset input fields
            } else if (input.tagName.toLowerCase() === 'select') {
                input.selectedIndex = 0; // Reset select elements
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
        dropdown.value = "0"; // Reset to default option
    });
}

// Attach event listeners to dropdowns
document.getElementById('selectProduct1').addEventListener('change', showForm);
document.getElementById('selectProduct2').addEventListener('change', showForm);
document.getElementById('selectProduct3').addEventListener('change', showForm);
document.getElementById('selectProduct4').addEventListener('change', showForm);
