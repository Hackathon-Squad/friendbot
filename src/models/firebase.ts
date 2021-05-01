import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBWoy_Yuy_z2wg9eX-GaYuEU8weoDahrtc",
    authDomain: "friendbot-discord.firebaseapp.com",
    projectId: "friendbot-discord",
    storageBucket: "friendbot-discord.appspot.com",
    messagingSenderId: "600320604302",
    appId: "1:600320604302:web:aa0796442c28295103b1df",
    measurementId: "G-20518RG3T6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;