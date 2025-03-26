import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBPAda4x0HGkMf7riXg8kJ4DLIzlbMU3Y0",
  authDomain: "business-directory-37b1c.firebaseapp.com",
  projectId: "business-directory-37b1c",
  storageBucket: "business-directory-37b1c.firebasestorage.app",
  messagingSenderId: "508041869871",
  appId: "1:508041869871:web:3b33bfa1ec7e7d392ca4da",
  measurementId: "G-BRBN3RCG4B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // ✅ Initialize Firestore
