import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from 'firebase/storage'; //storage for documents
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBQSHoRVe_bQzi9K-bRvlhqkL1uv9fCNrM",
    authDomain: "personify-d333c.firebaseapp.com",
    databaseURL: "https://personify-d333c-default-rtdb.firebaseio.com", 
    projectId: "personify-d333c",
    storageBucket: "personify-d333c.appspot.com",
    messagingSenderId: "1022665084418",
    appId: "1:1022665084418:web:8186ebac2c43c91a26611b",
    measurementId: "G-NN26QEWMRX"
  };
  

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(firebaseApp);

export default {
    firebaseApp,
    db,
    storage,
    auth
}