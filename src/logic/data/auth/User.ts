import type { UserCredential } from 'firebase/auth'

export class User {
  public uid: string
  public displayName: string
  public email: string
  public avatar: string
  public phone: string

  constructor(result: UserCredential) {
    this.uid = result.user.uid
    this.displayName = result.user.displayName ?? 'unknown'
    this.email = result.user.email ?? 'unknown'
    this.avatar = result.user.photoURL ?? 'unknown'
    this.phone = result.user.phoneNumber ?? 'unknown'
  }

  // Todo voir pour 2 fonctions :
  // Exist qui est le validation actuel
  // et un autre validation pour savoir si le profil est complet

  validation() {
    if (this.displayName === 'unknown' || this.email === 'unknown') return { exist: false, reason: 'unknown' }
    if (!this.email.endsWith('@pedagogiefde.org')) return { exist: false, reason: 'wrongEmail' }
    return { exist: true, reason: 'null' }
  }
}
