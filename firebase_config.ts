import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const getApiKeyFirebase = (): string => {

  return process.env.EXPO_PUBLIC_API_KEY_FIREBASE ?? ""; 
}

const apiKey = getApiKeyFirebase();

const firebaseConfig = {
  apiKey: getApiKeyFirebase(),
  authDomain: "mercatto-23676.firebaseapp.com",
  projectId: "mercatto-23676",
  storageBucket: "mercatto-23676.firebasestorage.app",
  messagingSenderId: "722476892011",
  appId: "1:722476892011:web:24accc716c523c3d21962e"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);