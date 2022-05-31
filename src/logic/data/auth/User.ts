import type * as Firebase from 'firebase/auth'
import type { PartialUserData, UserData } from '../firestore/datas/Users'
import { Users } from '../firestore/datas/Users'

export const setUser = (uid: string, data: PartialUserData) => {
  const store = new Users(uid)
  return store.setUser(data)
}

export const getUser = async(result: Firebase.User | null): Promise<{ result: false; error: string } | { result: true; data: UserData }> => {
  if (!result || !result.displayName || !result.email) return { result: false, error: 'result' }
  if (!result.email.endsWith('@pedagogiefde.org')) return { result: false, error: 'email' }
  const store = new Users(result.uid)
  const data = await store.getUser()
  await setUser(result.uid, { ...data, uid: result.uid, displayName: result.displayName, email: result.email, avatar: result.photoURL ?? '' })
  return { result: true, data }
}

export const isCompleteUser = async(data: UserData): Promise<{ result: false; error: string } | { result: true }> => {
  
}
