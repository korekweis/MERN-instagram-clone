import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseApp = initializeApp({
    //this is copy pasted from config
    apiKey: "AIzaSyDyY4gqptMLR6xdj0gnyuY9eNVpVcJ_69g",
    authDomain: "react-instagram-91748.firebaseapp.com",
    projectId: "react-instagram-91748",
    storageBucket: "react-instagram-91748.appspot.com",
    messagingSenderId: "724351673194",
    appId: "1:724351673194:web:771f40184bb92c92a2fb13",
    measurementId: "G-Z2EPFHG2F3"
});

//to access db
const db = getFirestore(firebaseApp);
//to access the authentication
const auth = getAuth(firebaseApp);
//how to upload
const storage = getStorage(firebaseApp);

export { db, auth, storage };