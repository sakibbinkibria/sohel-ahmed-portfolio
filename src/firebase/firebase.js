// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ9jx8jz9wniyEUXHF1L4LUyGlm4bSEWM",
  authDomain: "sohelahmedwebsite.firebaseapp.com",
  projectId: "sohelahmedwebsite",
  storageBucket: "sohelahmedwebsite.firebasestorage.app",
  messagingSenderId: "502320732396",
  appId: "1:502320732396:web:151001cc57e0eca6b9edc9"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db,auth };