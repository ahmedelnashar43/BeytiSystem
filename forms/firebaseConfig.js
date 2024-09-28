// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCo8vVlK3Oc5VolxEtoIwBCoLElNw8YYCs",
    authDomain: "lab-database-339b5.firebaseapp.com",
    databaseURL: "https://lab-database-339b5-default-rtdb.firebaseio.com",
    projectId: "lab-database-339b5",
    storageBucket: "lab-database-339b5.appspot.com",
    messagingSenderId: "1003613236472",
    appId: "1:1003613236472:web:96681f13d582fa2de15f0d",
    measurementId: "G-VQZNV14XYW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; // Export db for use in other files


