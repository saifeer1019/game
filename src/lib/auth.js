// lib/auth.js
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase.js';
const email_ = 'saifeer1019@gmail.com'
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Get token from user object, not userCredential
    const idToken = await userCredential.user.getIdToken();
    // Store this token in a cookie
    document.cookie = `auth-token=${idToken}; path=/`;
    return userCredential.user;
   
  } catch (error) {
    throw new Error(error.message);
  }
};
export const registerWithEmail = async (email, password) => {
  try {
   
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};