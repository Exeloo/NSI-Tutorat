import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: 'AIzaSyBpPvZsLu57oHxF5ftN8OQ_VCJKDXKf-3c',
  authDomain: 'tutorat-francois-destaing.firebaseapp.com',
  databaseURL: 'https://tutorat-francois-destaing-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'tutorat-francois-destaing',
  storageBucket: 'tutorat-francois-destaing.appspot.com',
  messagingSenderId: '770479068577',
  appId: '1:770479068577:web:027b521fa361248aa627e0',
  measurementId: 'G-R2QW06H4LN',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const provider = new GoogleAuthProvider()
export const auth = getAuth(app)

export const db = getFirestore(app)
export const storage = getStorage(app)
