// Import the functions you need from the SDKs you need
import { getStorage, ref } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// import firebaseui from 'firebaseui';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkcRxFUHpqSTCIdUycrTFBNXL04yOGcRo",
  authDomain: "seds-6d3a4.firebaseapp.com",
  projectId: "seds-6d3a4",
  storageBucket: "seds-6d3a4.appspot.com",
  messagingSenderId: "121797287604",
  appId: "1:121797287604:web:011c70e5892de3cc5301e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service
const storageRef = ref(storage);
/**
 * Sign in admin by password
 * @param {string} password 
 * @param {string} email 
 */
export function signInAdmin(email, password) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, errorCode)
    });
}
export function SignOutButton({ }) {
  const s = () => {
    auth.signOut();
  }
  return <button className="signout" onClick={s}>Sign Out</button>
}
/**
 * 
 * @param {DocumentSnapshot} doc 
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    date: data?.date?.toMillis() || 0,
    updatedAt: data?.updatedAt?.toMillis() || 0,
    // updatedAt: data?.updatedAt.toMillis() || 0,
  };
}