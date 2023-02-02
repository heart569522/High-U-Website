// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP6g1wtASve_cXd4vo64BfK0dlo6YF4dk",
  authDomain: "high-u.firebaseapp.com",
  projectId: "high-u",
  storageBucket: "high-u.appspot.com",
  messagingSenderId: "1021090428751",
  appId: "1:1021090428751:web:c31e27e16be8923a21773a",
  measurementId: "G-3KZ8K42CC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storageFirebase = getStorage();