import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"
import { getStorage } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js"

const firebaseConfig = {
  apiKey: "AIzaSyDnyu3-wtyuNAFTBkG_hR4T2FSYK30Qz08",
  authDomain: "vanilla-js-chat-998b6.firebaseapp.com",
  projectId: "vanilla-js-chat-998b6",
  storageBucket: "vanilla-js-chat-998b6.appspot.com",
  messagingSenderId: "607570434344",
  appId: "1:607570434344:web:1bb9d0fb9d97efc3f6181d",
  measurementId: "G-0PDSY7TEPR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();


