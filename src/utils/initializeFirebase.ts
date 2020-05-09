import * as firebase from 'firebase/app';

export const initializeFirebase = (): void => {
  firebase.initializeApp({
    apiKey: 'AIzaSyA7TPnfIXmhWhPOdLmJ5PSCVV_5m22J1GA',
    authDomain: 'what-lesson.firebaseapp.com',
    databaseURL: 'https://what-lesson.firebaseio.com',
    projectId: 'what-lesson',
    storageBucket: 'what-lesson.appspot.com',
    messagingSenderId: '573958511243',
    appId: '1:573958511243:web:6472dc4a77138a57ac128e',
    measurementId: 'G-MR2DHQ1YNK',
  });
};
