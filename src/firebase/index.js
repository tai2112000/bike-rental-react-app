import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCGtTLPr8tjUfuw4UlSXHEJfiThLsnr5-w",
  authDomain: "chothuexemay-35838.firebaseapp.com",
  databaseURL:
    "https://chothuexemay-35838-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chothuexemay-35838",
  storageBucket: "chothuexemay-35838.appspot.com",
  messagingSenderId: "904539941842",
  appId: "1:904539941842:web:0de08e2e7c3f3e144df60b",
  measurementId: "G-KLYQDBB8P8",
};

const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { storage, firebaseApp as default };
