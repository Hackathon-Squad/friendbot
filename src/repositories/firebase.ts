import firebase from 'firebase'
import { Config } from '../config';

const firebaseConfig = {
    apiKey: Config.apiKey,
    authDomain: Config.authDomain,
    projectId: Config.projectId,
    storageBucket: Config.storageBucket,
    messagingSenderId: Config.messagingSenderId,
    appId: Config.appId,
    measurementId: Config.measurementId,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
