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

export const registerUser = async (displayName, email, password, file) => {
  console.log(displayName);
  console.log(email);
  console.log(password);

  try {
    //Create user
    // #### TO DO: Add validation
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
        } catch (err) {
          console.log(err);
        }
      });
    });
    console.log("successfully registered");
    window.location.href = "/pages/Login.html";
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (email, password) => {
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

var currentUser = "";

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    currentUser = user;
  } else {
    console.log("no user signed in");
  }
});

console.log(`Current user: ${currentUser}`);

export const getUser = () => {
  console.log(`Current user: ${currentUser}`);
};
