import firebase from 'firebase/compat/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    // apiKey: "AIzaSyBbyTAUfH7PmxyYOw_VjB8cg-NpIU_R1FE",
    // authDomain: "realtimeexpo-df4ff.firebaseapp.com",
    // databaseURL: "https://realtimeexpo-df4ff-default-rtdb.asia-southeast1.firebasedatabase.app/",
    // projectId: "realtimeexpo-df4ff",
    // storageBucket: "realtimeexpo-df4ff.appspot.com",
    // messagingSenderId: "821691245707",
    // appId: "1:821691245707:web:0fd0c56f3cfe802747a08e",
    // measurementId: "G-PW8YW4FJH6"

    apiKey: "AIzaSyAbeR2z0c4lyi7ERzy_IcvKQmphOL7H3a0",
    authDomain: "realtimeexpo2.firebaseapp.com",
    databaseURL: "https://realtimeexpo2-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "realtimeexpo2",
    storageBucket: "realtimeexpo2.appspot.com",
    messagingSenderId: "132721398140",
    appId: "1:132721398140:web:69a5d6f8b3607d354654f9",
    measurementId: "G-56MTJEXVGV"
}

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();

export { db }