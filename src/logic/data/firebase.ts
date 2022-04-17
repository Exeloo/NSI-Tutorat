import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectStorageEmulator, getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCmiGNNYYY2pFM4DD0EDJ5c0b0VVRXgcog',
  authDomain: 'tutorat-francois-destaing.firebaseapp.com',
  databaseURL: 'https://tutorat-francois-destaing-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'tutorat-francois-destaing',
  storageBucket: 'tutorat-francois-destaing.appspot.com',
  messagingSenderId: '770479068577',
  appId: '1:770479068577:web:788ad629a94a0985a627e0',
  measurementId: 'G-RFNTH99MP8',
}

const app = initializeApp(firebaseConfig)

export const provider = new GoogleAuthProvider()
export const auth = getAuth(app)

export const db = getFirestore()
export const storage = getStorage(app)

const isEmulated = false

const emulator = () => {
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectFirestoreEmulator(db, 'localhost', 8081)
  connectStorageEmulator(storage, 'localhost', 9199)
}

// Use emulator
if (isEmulated)
  emulator()
