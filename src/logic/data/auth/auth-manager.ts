// import type { Ref } from 'vue'

import { GoogleAuthProvider, getRedirectResult, signInWithRedirect } from 'firebase/auth'
import { auth, provider } from '../firebase'
import { User } from './User'

export const user = ref<User | undefined>(undefined)

export const login = async() => {
  signInWithRedirect(auth, provider)
}

export const logout = () => {

}

export const defineRedirect = () => {
  getRedirectResult(auth)
    .then((result) => {
      console.log(1)
      if (!result) return

      user.value = new User(result)

      console.log(user.value.displayName, user.value.email, user.value.uid)
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      console.error(errorCode, errorMessage)
      // The email of the user's account used.
      const email = error.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
    })
}

// export const runAuth = (router: any) => {
//   router.push('login')
//   setTimeout(() => {
//     login()
//   }, 1000)
// }
