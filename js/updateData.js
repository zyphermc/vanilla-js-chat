import { auth, db, storage } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

var currentUser = "";

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    currentUser = user;
    console.log(user);
  } else {
    console.log("no user signed in");
  }
});

export const getUser = () => {
  console.log(`Current user: ${currentUser.uid}\n${currentUser.displayName}`);
};

export const updateUserDetails = async (elName, elImage) => {
  while (!auth.currentUser){
    console.log("asleep 100ms");
    await sleep(100);   
  }  

  elName.innerText = auth.currentUser.displayName;
  elImage.src = auth.currentUser.photoURL;
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
