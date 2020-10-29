import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAT_2FuH_ROzsy3LSNYWIF0PEJXrieICFA",
    authDomain: "aries-website-9da3e.firebaseapp.com",
    databaseURL: "https://aries-website-9da3e.firebaseio.com",
    projectId: "aries-website-9da3e",
    storageBucket: "aries-website-9da3e.appspot.com",
    messagingSenderId: "442216143584",
    appId: "1:442216143584:web:1891a19670a90e4a988e85",
    measurementId: "G-0MXTTLM6L6"
})


const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export {db , auth , storage}; 