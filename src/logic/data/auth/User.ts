import type { Auth } from './Auth'

export class User {
  private readonly name: string | null
  private readonly email: string | null
  private readonly avatarUrl: string | null
  private readonly uid: string
  private readonly token: string
  private readonly valid: boolean

  constructor(auth: Auth) {
    this.name = auth.getUser().displayName
    this.email = auth.getUser().email
    this.avatarUrl = auth.getUser().photoURL
    this.uid = auth.getUser().uid
    this.token = auth.getToken()
    this.valid = true
  }

  getName() {
    return <string> this.name
  }

  getEmail() {
    return <string> this.email
  }

  getAvatarUrl() {
    return <string> this.avatarUrl
  }

  getUid() {
    return <string> this.uid
  }

  getToken() {
    return <string> this.token
  }

  isValid() {
    return <boolean> this.valid
  }
}
