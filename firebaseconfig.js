import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDF7-ZQsjsXcc-ZDHlwlfqn6x4j4fW6Aos",
  authDomain: "typescript-login-71c6e.firebaseapp.com",
  projectId: "typescript-login-71c6e",
  storageBucket: "typescript-login-71c6e.appspot.com",
  messagingSenderId: "1064190759406",
  appId: "1:1064190759406:web:d2ae31b3dbcc6ae3583eff",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseDb = firebaseApp.firestore();
const firebaseAuth = firebase.auth();
const firebaseStorage = firebase.storage();
const firebaseAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebaseAuth, firebaseAuthProvider, firebaseDb, firebaseStorage };
