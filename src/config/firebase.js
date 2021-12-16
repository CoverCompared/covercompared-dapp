// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyDf3aMNNHZZ8-HRh8BXIDm97ukKLyK29Hk',
  authDomain: 'cover-compared-al.firebaseapp.com',
  projectId: 'cover-compared-al',
  storageBucket: 'cover-compared-al.appspot.com',
  messagingSenderId: '114810926427',
  appId: '1:114810926427:web:1c300a63c5407b2ac9d67e',
  measurementId: 'G-4BWKXST3YN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
