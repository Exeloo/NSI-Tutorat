import type { Ref } from 'vue'
import { Auth } from './Auth'
import { User } from './User'

const auth = new Auth()
const user = ref<User>()

export const login = async() => {
  await auth.signIn()
  const isValid = auth.isValid()
  if (!isValid.answer) return isValid
  user.value = new User(auth)
  return isValid
}

export const logout = () => {

}

export const getUser = () => {
  return <Ref<User>> user
}
