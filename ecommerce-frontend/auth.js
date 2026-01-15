import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Check login state
onAuthStateChanged(auth, (user) => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (user) {
    if (logoutBtn) logoutBtn.style.display = "block";
  } else {
    if (logoutBtn) logoutBtn.style.display = "none";
  }
});

// Logout function (GLOBAL)
window.logoutUser = function () {
  signOut(auth)
    .then(() => {
      alert("Logged out successfully");
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
};


