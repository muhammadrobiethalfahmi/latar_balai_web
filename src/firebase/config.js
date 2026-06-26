import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDeLmdqeRlLKkKC5rmnXl5mCY1AFUb6h6U",
  authDomain: "latar-balai-web.firebaseapp.com",
  projectId: "latar-balai-web",
  storageBucket: "latar-balai-web.firebasestorage.app",
  messagingSenderId: "1071288131685",
  appId: "1:1071288131685:web:43f632e99e4f8fd047268c",
  measurementId: "G-9TXLMBH70Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
