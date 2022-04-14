// import type { Ref } from 'vue'
// import { User } from './User'
import { Auth } from './Auth'

const auth = new Auth()
// const user = ref<User>()

export const login = async() => {
  await auth.signIn()
  const isValid = auth.valid
  if (!isValid.answer) return { authInfo: isValid, auth }
  // user.value = new User(auth)
  return { authInfo: isValid, auth }
}

export const logout = () => {

}

// export const getUser = () => {
//   return <Ref<User>> user
// }
