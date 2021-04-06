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
  const userRef = firestore.doc(`users/${userAuth.uid}`); //we check if this userAuth already exists in the db
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

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc(); //firebase gives new document reference in this collection and randomly generate an id for us
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => { //function to convert the array to an object
  const transformedCollection = collections.docs.map((doc) => { //.docs gives us querySnapshot array
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()), //method comes with every JS render, takes a string and convert to Url readable version
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
};


export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      //onAuthStateChanged takes either the succeed call(if we have userAuth), which gives us back the success value
      //or reject that gives us error
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
//this gives us access to GoogleAuthProvider class from auth library;
//it takes a couple of custom parameters using the CustomParameters method
googleProvider.setCustomParameters({ prompt: "select_account" });
//we want to trigger the google popup whenever we use this GoogleAuthProvider for authentication and sign in
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;