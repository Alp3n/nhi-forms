import firebase from 'firebase/app';
import 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyD_n-dO5HdzRwSlsCh7ZhN4Pgg3Z5xX0Oo',
  authDomain: 'nhiforms.firebaseapp.com',
  projectId: 'nhiforms',
  storageBucket: 'nhiforms.appspot.com',
  messagingSenderId: '228790117243',
  appId: '1:228790117243:web:aa9354bdf67ebb253c53de',
  measurementId: 'G-GH9FHEZR61',
};

firebase.initializeApp(firebaseConfig);
export const firebaseObj = firebase;
