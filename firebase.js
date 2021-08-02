import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import "@firebase/storage";

// Your web app's Firebase configuration, which you copy-pasted from Step 6
const firebaseConfig = {
  // CONFIG INFO GOES HERE
  apiKey: "AIzaSyBSgYEu2qLJZDADfzNmeZRT85Qw9Am6usQ",
  authDomain: "foster-youth.firebaseapp.com",
  projectId: "foster-youth",
  storageBucket: "foster-youth.appspot.com",
  messagingSenderId: "188006490783",
  appId: "1:188006490783:web:df24f22da2c69cd5bc78aa"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
let firestore = firebase.firestore();

export default firestore;
