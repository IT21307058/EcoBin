import firebase from 'firebase/compat/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBbyTAUfH7PmxyYOw_VjB8cg-NpIU_R1FE",
    authDomain: "realtimeexpo-df4ff.firebaseapp.com",
    databaseURL: "https://realtimeexpo-df4ff-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "realtimeexpo-df4ff",
    storageBucket: "realtimeexpo-df4ff.appspot.com",
    messagingSenderId: "821691245707",
    appId: "1:821691245707:web:0fd0c56f3cfe802747a08e",
    measurementId: "G-PW8YW4FJH6"
}

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();

export { db }