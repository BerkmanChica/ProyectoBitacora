// src/Firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkjSxKgd2f41D7bxL67_h7MGQGnKUdTwU",
  authDomain: "autenticacion-f69bf.firebaseapp.com",
  projectId: "autenticacion-f69bf",
  storageBucket: "autenticacion-f69bf.firebasestorage.app",
  messagingSenderId: "1048544009099",
  appId: "1:1048544009099:web:27f5a9a467ddb909532d8e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export const db = getFirestore(app);
