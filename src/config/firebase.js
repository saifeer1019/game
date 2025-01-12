// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjnrYSY3p-k-ZKhdqbcjw9W1cZwOyt_GI",
  authDomain: "adult-games-17125.firebaseapp.com",
  projectId: "adult-games-17125",
  storageBucket: "adult-games-17125.firebasestorage.app",
  messagingSenderId: "587055805897",
  appId: "1:587055805897:web:eb269e11f5c24d6448a418"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
// Firestore database instance
export const db = getFirestore(app);

export { auth, storage };