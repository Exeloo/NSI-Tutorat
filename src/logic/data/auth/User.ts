import type * as Firebase from 'firebase/auth'
import type { PartialUserData, UserData } from '../firestore/datas/Users'
import { Users } from '../firestore/datas/Users'
import { isValidChoices } from '~/logic/profil/school/school-manager'

export class User {
  private readonly _uid: string
  private readonly _displayName: string
  private readonly _email: string
  private readonly _avatar: string

  public exist: boolean
  public data: { value: UserData }
  public valid: boolean
  private readonly _store: Users | undefined

  constructor(result: Firebase.User | null) {
    this._uid = result?.uid ?? 'unknown'
    this._displayName = result?.displayName ?? 'unknown'
    this._email = result?.email ?? 'unknown'
    this._avatar = result?.photoURL ?? 'unknown'

    this.exist = this._uid !== 'unkonwn' && this._displayName !== 'unknown' && this._email !== 'unknown' && this._email.endsWith('@pedagogiefde.org')
    if (this.exist)
      this._store = new Users(this._uid)
    this.data = reactive({ value: <UserData>{ uid: this._uid, displayName: this._displayName, email: this._email, avatar: this._avatar } })
    this.valid = false
  }

  async get() {
    this.data.value = <UserData> await this._store?.getUser()
    return this.data
  }

  set(data: PartialUserData) {
    return this._store?.setUser(data)
  }

  async validation() {
    await this.set({ uid: this._uid, displayName: this._displayName, email: this._email, avatar: this._avatar })
    const data = await this.get()
    this.valid = isValidChoices(data.value.school)
    return this.valid
  }
}
