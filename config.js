import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";

import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {

  // Bhanuka FB
  // apiKey: "AIzaSyAbeR2z0c4lyi7ERzy_IcvKQmphOL7H3a0",
  // authDomain: "realtimeexpo2.firebaseapp.com",
  // databaseURL: "https://realtimeexpo2-default-rtdb.asia-southeast1.firebasedatabase.app/",
  // projectId: "realtimeexpo2",
  // storageBucket: "realtimeexpo2.appspot.com",
  // messagingSenderId: "132721398140",
  // appId: "1:132721398140:web:69a5d6f8b3607d354654f9",
  // measurementId: "G-56MTJEXVGV"

  // Bhanuka FB
  // apiKey: "AIzaSyAbeR2z0c4lyi7ERzy_IcvKQmphOL7H3a0",
  // authDomain: "realtimeexpo2.firebaseapp.com",
  // databaseURL: "https://realtimeexpo2-default-rtdb.asia-southeast1.firebasedatabase.app/",
  // projectId: "realtimeexpo2",
  // storageBucket: "realtimeexpo2.appspot.com",
  // messagingSenderId: "132721398140",
  // appId: "1:132721398140:web:69a5d6f8b3607d354654f9",
  // measurementId: "G-56MTJEXVGV"

  // Yasitha FB
  // apiKey: "AIzaSyAyDSBMm6B6H0l63ejdc9MOp900pNE1tz8",
  // authDomain: "ecobin-9cef3.firebaseapp.com",
  // databaseURL: "https://ecobin-9cef3-default-rtdb.firebaseio.com",
  // projectId: "ecobin-9cef3",
  // storageBucket: "ecobin-9cef3.appspot.com",
  // messagingSenderId: "418238658674",
  // appId: "1:418238658674:web:96fb6407e202bba9c76aeb",
  // measurementId: "G-M2GWLT81X1"

  // YeranFB
  apiKey: "AIzaSyBeWQ77TS2gfy0DAx06fKYMJCG_B9yjBpI",
  authDomain: "ecobin-f9162.firebaseapp.com",
  databaseURL:
    "https://ecobin-f9162-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "ecobin-f9162",
  storageBucket: "ecobin-f9162.appspot.com",
  messagingSenderId: "653129935056",
  appId: "1:653129935056:web:df29ed94505f34aa5c96d5",
  measurementId: "G-SSPPR1VRR6",

  // //wasana
  // apiKey: "AIzaSyA74LkNfeU0OuXwK8pSbwVajbMVyOeJ5ck",
  // authDomain: "ecobin-bd5a2.firebaseapp.com",
  // databaseURL: "https://ecobin-bd5a2-default-rtdb.asia-southeast1.firebasedatabase.app",
  // projectId: "ecobin-bd5a2",
  // storageBucket: "ecobin-bd5a2.appspot.com",
  // messagingSenderId: "390253799917",
  // appId: "1:390253799917:web:2cd27d189f3749d2c41fe4",
  // measurementId: "G-PSK5SBZPL8"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();

export { firebase, db };
