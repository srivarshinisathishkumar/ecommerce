// scripts/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA9miD8TRADJWndpHIAH-oYXVHE62cuitA",
  authDomain: "ecostore-777.firebaseapp.com",
  projectId: "ecostore-777",
  storageBucket: "ecostore-777.firebasestorage.app",
  messagingSenderId: "1009561862487",
  appId: "1:1009561862487:web:2434aee60dbb387555be12",
  measurementId: "G-ET0RLRT979"
};
// Initialize Firebase ONCE
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export auth
export { auth };
