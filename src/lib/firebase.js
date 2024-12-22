import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'chatzooka.firebaseapp.com',
  projectId: 'chatzooka',
  storageBucket: 'chatzooka.firebasestorage.app',
  messagingSenderId: '624543098225',
  appId: '1:624543098225:web:0bc84e75215f9901ffc2d0',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
