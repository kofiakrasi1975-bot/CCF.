auth.js
// auth.js
import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// If already logged in, go straight to dashboard
onAuthStateChanged(auth, async (user) => {
  if (user) {
    window.location.href = "dashboard.html";
  }
});

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("error-msg");

  errorMsg.textContent = "";

  if (!email || !password) {
    errorMsg.textContent = "Please enter email and password.";
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check role in Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      window.location.href = "dashboard.html";
    } else {
      errorMsg.textContent = "User record not found. Contact your admin.";
    }
  } catch (err) {
    errorMsg.textContent = "Login failed: " + err.message;
  }
});