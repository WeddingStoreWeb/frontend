// src/config/firebase.ts

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA7ZrzGTQlNrjSrVDiIDkySzvto1r9Z3bw",
    authDomain: "elite-gear-11381.firebaseapp.com",
    projectId: "elite-gear-11381",
    storageBucket: "elite-gear-11381.firebasestorage.app",
    messagingSenderId: "860624538796",
    appId: "1:860624538796:web:0e9b49a1df96ee4e67a309",
    measurementId: "G-NRLDKERMZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Storage
export const storage = getStorage(app);

export default app;