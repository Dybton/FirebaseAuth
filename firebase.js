
import { initializeApp } from "firebase/app";
import * as firebase from 'firebase';
import 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4vFwUsnm5M9NgnmHCNiDhOylShHShATw",
  authDomain: "fir-auth-fcdc8.firebaseapp.com",
  projectId: "fir-auth-fcdc8",
  storageBucket: "fir-auth-fcdc8.appspot.com",
  messagingSenderId: "155035042609",
  appId: "1:155035042609:web:76ebfe389342014da9a610"
};

// Initialize and connects firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}


// Gives us access to database
const db = firebase.firestore();

// Gives us access to authentification
const auth = firebase.auth();

// Firebase Login and Register Methods
const SignUpMethod = async (email, password) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      let user = userCredentials.user;
      console.log('Registered with:', user.uid)
      createUserObject(email, userCredentials.user)
    })
    .catch(error => alert(error.message))
    // Once this is done, run createUserObject
}


const createUserObject = (email, user) => {
  const userObjectRef = db.collection("userObjects").doc(user.uid);
  const emailArray = email.split("@");
  try {
    userObjectRef.set({
      email: email,
      name: emailArray[0],
      reading: [],
      read: [],
      uid: user.uid
    })
  } catch (error) {
  }
}

const LoginMethod = (email, password) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Logged in with:', user.email);
    })
    .catch(error => alert(error.message))
}

export { auth, db, SignUpMethod, LoginMethod };