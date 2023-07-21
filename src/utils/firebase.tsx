// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRgHCGcGKwC4GOwkxeBHWrkizzgQ8IBs8",
  authDomain: "cookshop-f2cc8.firebaseapp.com",
  projectId: "cookshop-f2cc8",
  storageBucket: "cookshop-f2cc8.appspot.com",
  messagingSenderId: "857533727055",
  appId: "1:857533727055:web:2b7727f8590c6fcef2c53a",
  measurementId: "G-NS7KGY0WK9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// export const fv = firebase.firestore.fieldValue;
export const auth = getAuth(app);
export const db = getFirestore(app);
