import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGILspGBbCOEfYsPCh16SUAzjkI34dIAo",
  authDomain: "pokemon-95ca4.firebaseapp.com",
  projectId: "pokemon-95ca4",
  storageBucket: "pokemon-95ca4.appspot.com",
  messagingSenderId: "745793963780",
  appId: "1:745793963780:web:1e6d17b2898f995993f251"
};

const app=firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);