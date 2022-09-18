import type { User } from 'firebase/auth'
import { getRedirectResult, signInWithRedirect, signOut } from 'firebase/auth'
import { ref } from 'vue'
import { auth, provider } from '../firebase'
import type { UserData } from '../firestore/datas/Users'
import { getUser } from './user'
import { toggleLoadingPage } from '~/main'
import { isValidChoices } from '~/logic/profil/school/school-manager'
import { isValidPlanning } from '~/logic/profil/planning/planning-manager'

export const user = ref<UserData>()
export const result = ref<{ result: false; error: string } | { result: true }>({ result: false, error: 'noResult' })

export const logout = () => {
  return signOut(auth)
}

export const updateUser = (d: UserData) => {
  user.value = d
}

const login = async(forceNoRedirect = false, isLogout = true, u?: User, isF = false): Promise<{ result: false; error: string } | { result: true }> => {
  if (isF && !u && !auth.currentUser)
    return { result: false, error: 'cookies' }
  const userResult = await getUser(u ?? auth.currentUser)
  if (!userResult.result) {
    if (userResult.error === 'result') {
      if (!forceNoRedirect) await signInWithRedirect(auth, provider)
      return userResult
    }
    if (isLogout) await logout()
    return userResult
  }
  user.value = userResult.data
  if (!isValidChoices(userResult.data.school))
    return { result: false, error: 'school' }
  if (!isValidPlanning(userResult.data.planning))
    return { result: false, error: 'planning' }
  return { result: true }
}

export const userLogin = async() => {
  result.value = await login()
}

export const defineRedirect = () => {
  getRedirectResult(auth)
    .then(async(u) => {
      result.value = (await login(true, false, u?.user, true))
      if (!result.value.result && !['/', '/terms', '/about', '/faq', '/admin', '/login'].includes(window.location.pathname))
        window.location.replace('/login')
      else if (result.value.result && ['/', '/login'].includes(window.location.pathname))
        window.location.replace('/dashboard')
      toggleLoadingPage(false)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.error('AuthError', errorCode, errorMessage)
    })
}
