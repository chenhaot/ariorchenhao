import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAMDtGbGLRJnK6SC_xVEsUsmqc2fBuQkac",
  authDomain: "hottake-guess.firebaseapp.com",
  projectId: "hottake-guess",
  storageBucket: "hottake-guess.firebasestorage.app",
  messagingSenderId: "228267073794",
  appId: "1:228267073794:web:42cf07167b85fe9164221b",
  measurementId: "G-7J0WYVLPE8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
