import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { API_KEY } from "./api_key_firebase";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "mercatto-d165a.firebaseapp.com",
  projectId: "mercatto-d165a",
  storageBucket: "mercatto-d165a.firebasestorage.app",
  messagingSenderId: "923852911912",
  appId: "1:923852911912:web:fcff877c5ef63eaea78c1d"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);