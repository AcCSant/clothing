import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, 
  GoogleAuthProvider, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import {    getFirestore, doc, getDoc, setDoc  
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPuy9dmSV4yy4mZMo2KlZViXKbsonZRms",
    authDomain: "clothing-db-83bf9.firebaseapp.com",
    projectId: "clothing-db-83bf9",
    storageBucket: "clothing-db-83bf9.appspot.com",
    messagingSenderId: "38302973853",
    appId: "1:38302973853:web:c2844dbfb6ae9620c1b974"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account",
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    //if user exists this is not gonna run
  if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInformation});
    } catch (error){
      console.log('error creating the user', error.message);
    }
  }
    return userDocRef;
    //Pseudo-code
    //He wants to check if user data exists, wants to set the user data
    //Will set data in the collection using userSnapshot
    //if user data does not exist 
    //return userDocRef
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
  }
  // will create another interface layer function to sign out

  export const signOutUser = async () => await signOut(auth);

  //this is just saying: call me whenever this callback is instantiated
  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);