// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP0bULGo4fW45sSU0NrV_WTcgxuQRI1tQ",
  authDomain: "games-ebffe.firebaseapp.com",
  projectId: "games-ebffe",
  storageBucket: "games-ebffe.firebasestorage.app",
  messagingSenderId: "793358757844",
  appId: "1:793358757844:web:7e285922b2b7a9ea2ef041"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };