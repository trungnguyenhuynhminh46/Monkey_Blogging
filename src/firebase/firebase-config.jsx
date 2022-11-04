import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCAlBG77stxAsPkECXl9UBJEIdCCLGHMbc",
  authDomain: "monkey-blogging-f7b28.firebaseapp.com",
  projectId: "monkey-blogging-f7b28",
  storageBucket: "monkey-blogging-f7b28.appspot.com",
  messagingSenderId: "736576275336",
  appId: "1:736576275336:web:3c240b057c9b426dbb703d",
  measurementId: "G-JGSB9PX6SX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
