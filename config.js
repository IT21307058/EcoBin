import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";

import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  // apiKey: "AIzaSyAbeR2z0c4lyi7ERzy_IcvKQmphOL7H3a0",
  // authDomain: "realtimeexpo2.firebaseapp.com",
  // databaseURL: "https://realtimeexpo2-default-rtdb.asia-southeast1.firebasedatabase.app/",
  // projectId: "realtimeexpo2",
  // storageBucket: "realtimeexpo2.appspot.com",
  // messagingSenderId: "132721398140",
  // appId: "1:132721398140:web:69a5d6f8b3607d354654f9",
  // measurementId: "G-56MTJEXVGV"

  apiKey: "AIzaSyBeWQ77TS2gfy0DAx06fKYMJCG_B9yjBpI",
  authDomain: "ecobin-f9162.firebaseapp.com",
  databaseURL:
    "https://ecobin-f9162-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "ecobin-f9162",
  storageBucket: "ecobin-f9162.appspot.com",
  messagingSenderId: "653129935056",
  appId: "1:653129935056:web:df29ed94505f34aa5c96d5",
  measurementId: "G-SSPPR1VRR6",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();

export { firebase, db };
