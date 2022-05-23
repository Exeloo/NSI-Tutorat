import { getRedirectResult, signInWithRedirect, signOut } from 'firebase/auth'
import { auth, provider } from '../firebase'
import { User } from './User'

export const user = reactive({ value: new User(auth.currentUser) })

export const softLogin = async() => {
  user.value = new User(auth.currentUser)
  if (user.value.exist) await user.value.validation()
}

export const login = async() => {
  user.value = new User(auth.currentUser)
  if (user.value.exist) {
    await user.value.validation()
    return
  }

  await signInWithRedirect(auth, provider)
}

export const logout = () => {
  signOut(auth)
}

export const defineRedirect = () => {
  getRedirectResult(auth)
    .then((result) => {
      if (!result) return
      user.value = new User(result.user)
      user.value.validation()
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.error(errorCode, errorMessage)
    })
}
