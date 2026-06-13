dashboard.js
// dashboard.js
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const userDoc = await getDoc(doc(db, "users", user.uid));
  if (!userDoc.exists()) {
    window.location.href = "index.html";
    return;
  }

  const data = userDoc.data();
  document.getElementById("user-name").textContent = data.name || user.email;
  document.getElementById("user-role").textContent = data.role || "leader";

  // Show admin panel only if role is admin
  if (data.role === "admin") {
    document.getElementById("admin-section").classList.remove("hidden");
  }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
});