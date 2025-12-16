import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9roTb_bXM7FB5mkv9UhvZhDJC2lbo2fg",
  authDomain: "reactlinks-8dc51.firebaseapp.com",
  projectId: "reactlinks-8dc51",
  storageBucket: "reactlinks-8dc51.firebasestorage.app",
  messagingSenderId: "483147750806",
  appId: "1:483147750806:web:c43ae77eca01e289cbd1b7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };