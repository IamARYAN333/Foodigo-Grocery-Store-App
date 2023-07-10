//  import firebase from 'firebase/app';
// import { initializeApp } from 'firebase/app';
// import database from 'firebase/database';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBPAVZA_DXRuoGLrnDIKt18HCbjHE89uqk",
    authDomain: "grocerywalaapp-d5a9d.firebaseapp.com",
    projectId: "grocerywalaapp-d5a9d",
    storageBucket: "grocerywalaapp-d5a9d.appspot.com",
    messagingSenderId: "402207885556",
    appId: "1:402207885556:web:4368215094eb818e4936a1",
    measurementId: "G-XGLLY602K5",
    databaseURL: "https://grocerywalaapp-d5a9d-default-rtdb.firebaseio.com/",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig); 
 }
// const db = firebase.

const db = firebase.database();
// const db = firebase.
export { db };
