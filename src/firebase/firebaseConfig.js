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
  apiKey: "AIzaSyAKJeV28fRQeR8AF-3qVCxvd8i3dvP51fc",
  authDomain: "bicycle-shop-de666.firebaseapp.com",
  databaseURL: "https://bicycle-shop-de666-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bicycle-shop-de666",
  storageBucket: "bicycle-shop-de666.appspot.com",
  messagingSenderId: "399909144954",
  appId: "1:399909144954:web:618e48b6f93db3865caec3",
  measurementId: "G-1WWX1Z33EW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  // Initialize Firebase app with configuration
const analytics = getAnalytics(app);  // Initialize Firebase analytics
const database = getDatabase(app);    // Get a reference to the Firebase Realtime Database
const storage = getStorage(app);      // Get a reference to Firebase Storage
const auth = getAuth(app);            // Get a reference to Firebase Authentication

// Initialize Firebase Storage
export { app, analytics, database, storage, ref, getDownloadURL, auth, signInWithCustomToken };
