import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyCZND00i8uDP9cCFJ0ea7E_r2E884U_rnU",
    authDomain: "crwn-db-a79ea.firebaseapp.com",
    projectId: "crwn-db-a79ea",
    storageBucket: "crwn-db-a79ea.appspot.com",
    messagingSenderId: "1024223448603",
    appId: "1:1024223448603:web:26e335cc3a9e9b07dcf2be",
    measurementId: "G-GCFYRV0YWS"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
//this gives us access to GoogleAuthProvider class from auth library;
//it takes a couple of custom parameters using the CustomParameters method
provider.setCustomParameters({ prompt: 'select_account' }); 
//we want to always trigger the google popup whenever we us this GoogleAuthProvider for authentication and sign in
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;