import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const app = initializeApp({
    apiKey: "AIzaSyAWWhMrVS-inYR6kHqRY72E-lJGODbQ8vM",
    authDomain: "greendo-1.firebaseapp.com",
    databaseURL: "https://greendo-1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "greendo-1",
    storageBucket: "greendo-1.appspot.com",
    messagingSenderId: "492015531620",
    appId: "1:492015531620:web:ee3274f251d46f92275171"
})

export const auth = getAuth(app)
export const db = getDatabase(app)