import { getRedirectResult, signInWithRedirect, signOut } from 'firebase/auth'
import { ref } from 'vue'
import { auth, provider } from '../firebase'
import type { UserData } from '../firestore/datas/Users'
import { getUser } from './user'
import { toggleLoadingPage } from '~/main'
import { isValidChoices } from '~/logic/profil/school/school-manager'
import { isValidPlanning } from '~/logic/profil/planning/planning-manager'

export const user = ref<UserData>()

export const logout = () => {
  return signOut(auth)
}

export const login = async(forceNoRedirect = false, isLogout = true): Promise<{ result: false; error: string } | { result: true }> => {
  const userResult = await getUser(auth.currentUser)
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

export const defineRedirect = () => {
  getRedirectResult(auth)
    .then(async() => {
      if (!(await login(true, false)).result && !['/', '/terms', '/contact', '/about', '/faq', '/admin', '/login'].includes(window.location.pathname))
        window.location.replace('/login')
      toggleLoadingPage(false)
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.error(errorCode, errorMessage)
    })
}
