// Firebase.js (Setup Firebase)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCA-jGGoQzMMYDVitaevuDG82FLMSJJZT4",
    authDomain: "bmi-calc-ce6ae.firebaseapp.com",
    projectId: "bmi-calc-ce6ae",
    storageBucket: "bmi-calc-ce6ae.appspot.com",
    messagingSenderId: "213485077676",
    appId: "1:213485077676:web:dc38bd06c573d7bd354b09",
    measurementId: "G-HQK594FFC4"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
