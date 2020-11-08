import firebase from 'firebase/app';
import 'firebase/firestore';

//Loads firebase
firebase.initializeApp({
    apiKey: "AIzaSyC6rNBAjEgpnnCfe_-5tRO4ESl3adCyYwM",
    authDomain: "students-on-vuefire-17fe1.firebaseapp.com",
    databaseURL: "https://students-on-vuefire-17fe1.firebaseio.com",
    projectId: "students-on-vuefire-17fe1",
    storageBucket: "students-on-vuefire-17fe1.appspot.com",
    messagingSenderId: "864499541202",
    appId: "1:864499541202:web:dbd76b2be758849c34390b"
});

//Exports the firestore database as a variable
export const db = firebase.firestore();

//Grabbing firestore server timestamp to use for universal compatibility
export const { serverTimestamp } = firebase.firestore.FieldValue;