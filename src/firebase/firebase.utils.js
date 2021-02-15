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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  //this function takes userAuth object that we get back from auth library when we login
  //and store inside the db
  if (!userAuth) return;//if userAuth obj doesn't exist exit from this function; 
  const userRef = firestore.doc(`users/${userAuth.uid}`); //we check if this userAuth alreadt exists in the db
                                                          //we are getting back document Reference object

  const snapShot = await userRef.get(); //we are getting back document snapShot object
  if (!snapShot.exist) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef; //maybe we will have to do use it later
}
//^this function allows us to take that user auth object that we got back
//from auth library and then store inside the database


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
//this gives us access to GoogleAuthProvider class from auth library;
//it takes a couple of custom parameters using the CustomParameters method
provider.setCustomParameters({ prompt: "select_account" });
//we want to trigger the google popup whenever we use this GoogleAuthProvider for authentication and sign in
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;