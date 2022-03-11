// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDt5achFcrXg0F8xWXefyCXNkF17dcVwZQ",
  authDomain: "house-marketplace-alan.firebaseapp.com",
  projectId: "house-marketplace-alan",
  storageBucket: "house-marketplace-alan.appspot.com",
  messagingSenderId: "324993223998",
  appId: "1:324993223998:web:a083e7b4ea1945ca69306f",
  measurementId: "G-Z5N0GY04MF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

export { db };
