import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'
import { getAuth } from 'firebase/auth'
import { ref } from 'vue'
import { getStorage } from 'firebase/storage'
import { loadUserInfos } from './firebase-auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCmiGNNYYY2pFM4DD0EDJ5c0b0VVRXgcog',
  authDomain: 'tutorat-francois-destaing.firebaseapp.com',
  projectId: 'tutorat-francois-destaing',
  storageBucket: 'tutorat-francois-destaing.appspot.com',
  // messagingSenderId: '1026012474290',
  // appId: '1:1026012474290:web:7fa7d8786afe732a4e52ab',
  // measurementId: 'G-CMPQ0L9HYQ',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const functions = getFunctions(app)
export const storage = getStorage(app)

export const auth = getAuth()
export const user = ref()
export const authLoading = ref<boolean>(true)
auth.onAuthStateChanged(async() => {
  if (auth.currentUser)
    user.value = await loadUserInfos()
  else
    user.value = null

  authLoading.value = false
})
