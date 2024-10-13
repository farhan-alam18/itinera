import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQ_GsNfsR1yzPa4ZmcKBydUqosNoxj51I",
  authDomain: "fir-tutorial-ea921.firebaseapp.com",
  projectId: "fir-tutorial-ea921",
  storageBucket: "fir-tutorial-ea921.appspot.com",
  messagingSenderId: "186239393502",
  appId: "1:186239393502:web:3062f13c6e6d9fde57ec4f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);