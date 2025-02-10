import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCh9j3uVSZt-erbAlZYPSyesbU8fX9mKUo",
    authDomain: "financehub-1f3ea.firebaseapp.com",
    projectId: "financehub-1f3ea",
    storageBucket: "financehub-1f3ea.firebasestorage.app",
    messagingSenderId: "969121894326",
    appId: "1:969121894326:web:b6a7f95e9e5a7fce483b17",
    measurementId: "G-WDNMY2L1EC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const database = getDatabase(app);