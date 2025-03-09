import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCF-pKDa_rmcCsVH8gDUavNbbmG__gACrU",
  authDomain: "incline-b519a.firebaseapp.com",
  projectId: "incline-b519a",
  storageBucket: "incline-b519a.firebasestorage.app",
  messagingSenderId: "131798853980",
  appId: "1:131798853980:web:b2f478d9d917c1b9acf999",
};

const app = initializeApp(firebaseConfig);

// Export Firebase Auth
const auth = getAuth(app);

// Export Firestore
const db = getFirestore(app);

export { auth, db };
