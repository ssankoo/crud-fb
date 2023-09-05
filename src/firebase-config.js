import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAo0dnhd2vHHlo9L3F-xj-vxS-cEBVPMUc",
    authDomain: "test-db-48371.firebaseapp.com",
    projectId: "test-db-48371",
    storageBucket: "test-db-48371.appspot.com",
    messagingSenderId: "268455823497",
    appId: "1:268455823497:web:4e2cfb72cff8403677de58"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)