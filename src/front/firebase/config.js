import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfoVa4C9t0QOcl4VOoqqgnaROadyZJ-O8",
  authDomain: "vital-products-d2501.firebaseapp.com",
  projectId: "vital-products-d2501",
  storageBucket: "vital-products-d2501.appspot.com",
  messagingSenderId: "203753626165",
  appId: "1:203753626165:web:45360093400fc97aab2f7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);