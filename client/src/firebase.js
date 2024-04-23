// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "mern-e-commerce-c931d.firebaseapp.com",
    projectId: "mern-e-commerce-c931d",
    storageBucket: "mern-e-commerce-c931d.appspot.com",
    messagingSenderId: "614136624193",
    appId: "1:614136624193:web:e4aaa661562b1eb0c242c0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);