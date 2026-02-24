import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { API_KEY } from "./api_key_firebase";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "mercatto-23676.firebaseapp.com",
  projectId: "mercatto-23676",
  storageBucket: "mercatto-23676.firebasestorage.app",
  messagingSenderId: "722476892011",
  appId: "1:722476892011:web:24accc716c523c3d21962e"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);