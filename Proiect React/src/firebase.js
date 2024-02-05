import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTq7IsEXzR9eEXkX5-ewJdUJRzsv1X45I",
  authDomain: "chat-application-4da37.firebaseapp.com",
  projectId: "chat-application-4da37",
  storageBucket: "gs://chat-application-4da37.appspot.com",
  messagingSenderId: "881303005730",
  appId: "1:881303005730:web:4a6c2557ee4c8ecaa9787b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();
