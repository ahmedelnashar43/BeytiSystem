import { db } from './firebaseConfig.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { exportToExcel } from './excelExport.js';

async function retrieveData() {
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const shift = document.getElementById('shiftCriteria').value;
  const sampleCondition = document.getElementById('sampleConditionCriteria').value;

  let dataQuery = collection(db, "labData");

  const queries = [];
  if (startDate && endDate) {
    queries.push(where("timestamp", ">=", new Date(startDate)), where("timestamp", "<=", new Date(endDate)));
  }
  if (shift) {
    queries.push(where("shift", "==", shift));
  }
  if (sampleCondition) {
    queries.push(where("sampleCondition", "==", sampleCondition));
  }

  try {
    const finalQuery = query(dataQuery, ...queries);
    const querySnapshot = await getDocs(finalQuery);
    const data = querySnapshot.docs.map(doc => doc.data());
    
    console.log(data);
    exportToExcel(data);
  } catch (error) {
    console.error("Error retrieving documents: ", error);
  }
}

export { retrieveData };
