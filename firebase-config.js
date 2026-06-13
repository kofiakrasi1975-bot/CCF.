firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD8NFqxOjVNHFCgB2uzr7gyr28ho6eJYiU",
  authDomain: "ccf-database-9966e.firebaseapp.com",
  projectId: "ccf-database-9966e",
  storageBucket: "ccf-database-9966e.firebasestorage.app",
  messagingSenderId: "834572794978",
  appId: "1:834572794978:web:d31ec4c9229801b473a53b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);