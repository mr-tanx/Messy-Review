import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4dB4DuEB-7nztP_h-g5SL-vrIsSQyVP4",
  authDomain: "mess-review-system.firebaseapp.com",
  projectId: "mess-review-system",
  storageBucket: "mess-review-system.firebasestorage.app",
  messagingSenderId: "341944995038",
  appId: "1:341944995038:web:4e73a1e1bb5d6d1f95064f",
  measurementId: "G-JE79FFJNCN"
};

const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);