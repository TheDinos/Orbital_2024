// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBFSrwMGwxXaf1QgPcyFRIYFNtRJfJ7Yg",
  authDomain: "orbitalsummer2024.firebaseapp.com",
  projectId: "orbitalsummer2024",
  storageBucket: "orbitalsummer2024.appspot.com",
  messagingSenderId: "672291827822",
  appId: "1:672291827822:web:aa36306c75124cea95367f",
  measurementId: "G-YQVJMPHC8R"  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
