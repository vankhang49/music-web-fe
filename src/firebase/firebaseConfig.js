// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getDatabase } from "firebase/database";
import { getAuth, signInWithCustomToken } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABIT0Afsu8bgXj1Yza8eIlwaFnnjYNiHQ",
  authDomain: "music-g-649ea.firebaseapp.com",
  projectId: "music-g-649ea",
  databaseURL: "https://music-g-649ea-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "music-g-649ea.appspot.com",
  messagingSenderId: "767460951414",
  appId: "1:767460951414:web:7eb4b835f04f4caf442657",
  measurementId: "G-NB16DCLZSZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  // Initialize Firebase app with configuration
const analytics = getAnalytics(app);  // Initialize Firebase analytics
const database = getDatabase(app);    // Get a reference to the Firebase Realtime Database
const storage = getStorage(app);      // Get a reference to Firebase Storage
const auth = getAuth(app);            // Get a reference to Firebase Authentication

// Initialize Firebase Storage
export { app, analytics, database, storage, ref, getDownloadURL, auth, signInWithCustomToken };
