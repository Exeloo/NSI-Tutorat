import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { initMessaging } from './messaging/initMessaging'

// import { onBackgroundMessage } from 'firebase/messaging/sw'
// import { connectStorageEmulator, getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAuX19RmaFWBcKB5PSZ8gUYND_3DWQS6uI',
  authDomain: 'tutorat-fde.firebaseapp.com',
  projectId: 'tutorat-fde',
  storageBucket: 'tutorat-fde.appspot.com',
  messagingSenderId: '926532289308',
  appId: '1:926532289308:web:694157cf48d6bfbf6f30d9',
}

export const app = initializeApp(firebaseConfig)

export const provider = new GoogleAuthProvider()
export const auth = getAuth(app)

export const db = getFirestore(app)

// initMessaging()

const isEmulated = false

const emulator = () => {
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectFirestoreEmulator(db, 'localhost', 8081)
  // connectStorageEmulator(storage, 'localhost', 9199)
}

// Use emulator
if (isEmulated)
  emulator()
