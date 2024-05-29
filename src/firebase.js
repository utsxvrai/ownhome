// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpkSihlYwh3d7724X6JATAkDx3bco9BjI",
  authDomain: "ownhome-67296.firebaseapp.com",
  projectId: "ownhome-67296",
  storageBucket: "ownhome-67296.appspot.com",
  messagingSenderId: "620262343768",
  appId: "1:620262343768:web:30f6761bfd321a154bf62d",
  measurementId: "G-KCDVR4F5BK"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
