import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDKPpE-nIe2jDUfGjtj071LqKJHVm4JzbM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "codeorbit-70b7c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "codeorbit-70b7c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "codeorbit-70b7c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "331221127135",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:331221127135:web:0ce3889390f9426e753e6a",
};

// Initialize or reuse Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const db = getFirestore(app);

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
};

export default app;
