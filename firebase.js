// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4vFwUsnm5M9NgnmHCNiDhOylShHShATw",
  authDomain: "fir-auth-fcdc8.firebaseapp.com",
  projectId: "fir-auth-fcdc8",
  storageBucket: "fir-auth-fcdc8.appspot.com",
  messagingSenderId: "155035042609",
  appId: "1:155035042609:web:76ebfe389342014da9a610"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();

// Firebase Login and Register Methods
const SignUpMethod = (email, password) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Registered with:', user.email);
    })
    .catch(error => alert(error.message))
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


export { auth, SignUpMethod, LoginMethod };