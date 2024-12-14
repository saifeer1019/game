"use client";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
export default function Auth() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.error(error);
            });
    };

  return <div>
    <input type="text" placeholder="Email" value={formData.email} onChange={handleInputChange} name="email" />
    <input type="password" placeholder="Password" value={formData.password} onChange={handleInputChange} name="password" />
    <button onClick={handleSignIn}>Sign In</button>
    <button onClick={handleSignUp}>Sign Up</button>
  </div>;
}