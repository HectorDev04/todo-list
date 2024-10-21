import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBevpFqAod8qLY6cxm6lxUWOiPM5_7h46w",
    authDomain: "todo-list-6f860.firebaseapp.com",
    projectId: "todo-list-6f860",
    storageBucket: "todo-list-6f860.appspot.com",
    messagingSenderId: "298276470398",
    appId: "1:298276470398:web:9924e3483284a91b96a22f",
    measurementId: "G-SJ4WMRNYDX"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
