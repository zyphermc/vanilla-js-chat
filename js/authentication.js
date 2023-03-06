import { auth, db, storage } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

export const registerUser = async () => {
  const displayName = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const file = document.getElementById("file").value;

  console.log(displayName);
  console.log(email);
  console.log(password);

  try {
    //Create user
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log(res);
    //Create a unique image name
    const date = new Date().getTime();
    const storageRef = ref(storage, `${displayName + date}`);

    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          //Update profile
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });
          //create user on firestore
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "userChats", res.user.uid), {});
          console.log("successfully registered");
          window.location.href = "/pages/Login.html";
        } catch (err) {
          console.log(err);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(email);
  console.log(password);

  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("successfully logged in");
    window.location.href = "/pages/Home.html";
  } catch (err) {
    console.log(err);
  }
};

export const logoutUser = async () => {
  try {
    signOut(auth);
    console.log("logged out");
    window.location.href = "/pages/Login.html";
  } catch (err) {
    console.log(err);
  }
};

var currentUser = "asd";

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    currentUser = user;
  } else {
    console.log("no user signed in");
  }
});

console.log(currentUser);

export const getUser = () => {
  console.log(currentUser);
};
