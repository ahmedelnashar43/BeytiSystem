import { db } from './firebaseConfig.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { exportToExcel } from './excelExport.js';

async function retrieveData() {
  // Get form values
  const startDate = document.getElementById('startDate')?.value;
  const endDate = document.getElementById('endDate')?.value;
  const shift = document.getElementById('shiftCriteria')?.value;
  const sampleCondition = document.getElementById('sampleConditionCriteria')?.value;
  const ph = document.getElementById('phCriteria')?.value;
  const acidity = document.getElementById('acidityCriteria')?.value;
  const density = document.getElementById('densityCriteria')?.value;
  const temp = document.getElementById('tempCriteria')?.value;
  const spGr = document.getElementById('spGrCriteria')?.value;
  const fat = document.getElementById('fatCriteria')?.value;
  const snf = document.getElementById('snfCriteria')?.value;
  const ts = document.getElementById('tsCriteria')?.value;
  const protein = document.getElementById('proteinCriteria')?.value;
  const analyst = document.getElementById('analystCriteria')?.value;

  // Log the input values for debugging
  console.log("Form Values: ", {
    startDate,
    endDate,
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
    analyst
  });

  // Build query with dynamic filtering
  let dataQuery = collection(db, "labData");
  const queries = [];

  // Add date range filter only if both startDate and endDate are provided
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    queries.push(where("timestamp", ">=", start), where("timestamp", "<=", end));
    console.log(`Date range filter: From ${startDate} to ${endDate}`);
  }

  // Add filters dynamically if values are provided
  if (shift) {
    queries.push(where("shift", "==", shift));
    console.log(`Filtering by shift: ${shift}`);
  }
  if (sampleCondition) {
    queries.push(where("sampleCondition", "==", sampleCondition));
    console.log(`Filtering by sampleCondition: ${sampleCondition}`);
  }
  if (ph) {
    queries.push(where("ph", "==", parseFloat(ph)));
    console.log(`Filtering by ph: ${ph}`);
  }
  if (acidity) {
    queries.push(where("acidity", "==", parseFloat(acidity)));
    console.log(`Filtering by acidity: ${acidity}`);
  }
  if (density) {
    queries.push(where("density", "==", parseFloat(density)));
    console.log(`Filtering by density: ${density}`);
  }
  if (temp) {
    queries.push(where("temp", "==", parseFloat(temp)));
    console.log(`Filtering by temp: ${temp}`);
  }
  if (spGr) {
    queries.push(where("spGr", "==", parseFloat(spGr)));
    console.log(`Filtering by spGr: ${spGr}`);
  }
  if (fat) {
    queries.push(where("fat", "==", parseFloat(fat)));
    console.log(`Filtering by fat: ${fat}`);
  }
  if (snf) {
    queries.push(where("snf", "==", parseFloat(snf)));
    console.log(`Filtering by snf: ${snf}`);
  }
  if (ts) {
    queries.push(where("ts", "==", parseFloat(ts)));
    console.log(`Filtering by ts: ${ts}`);
  }
  if (protein) {
    queries.push(where("protein", "==", parseFloat(protein)));
    console.log(`Filtering by protein: ${protein}`);
  }
  if (analyst) {
    queries.push(where("analyst", "==", analyst));
    console.log(`Filtering by analyst: ${analyst}`);
  }

  try {
    // Only build the query if there are filters, otherwise fetch all data
    const finalQuery = queries.length ? query(dataQuery, ...queries) : dataQuery;

    // Execute query and retrieve documents
    const querySnapshot = await getDocs(finalQuery);
    const data = querySnapshot.docs.map(doc => doc.data());

    // Log the data retrieved for debugging
    console.log("Data Retrieved: ", data);

    if (data.length > 0) {
      exportToExcel(data);  // Export data to Excel
    } else {
      console.warn("No data matches the criteria.");
      alert("No data found for the selected criteria.");
    }
  } catch (error) {
    console.error("Error retrieving documents: ", error);
    alert("Error retrieving data. Please try again.");
  }
}

// Attach to window to make it globally accessible
window.retrieveData = retrieveData;
