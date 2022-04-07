import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import type { OAuthCredential, User } from 'firebase/auth'
import { auth, provider } from '../firebase'

export class Auth {
  private credential: OAuthCredential | null | undefined
  private token: string | undefined
  private user: User | undefined
  private error: { code: any; message: any } | undefined
  private valid: { answer: boolean; reason: string } | undefined

  constructor() {
    this.valid = undefined
  }

  private validation() {
    if (!this.token || !this.user) {
      const error = this.error ? this.error : { code: 'undefined', message: 'Erreur inconue' }
      return { answer: false, reason: `Code : ${error.code}, Erreur : ${error.message}` }
    }
    if (!this.getUser().email?.endsWith('@pedagogiefde.org'))
      return { answer: false, reason: 'Email invalide, veuillez mettre une adresse mail du lycée François d\'Estaing !' }

    return { answer: true, reason: 'Ok' }
  }

  async signIn() {
    await signInWithPopup(auth, provider)
      .then((result) => {
        this.credential = GoogleAuthProvider.credentialFromResult(result)
        this.token = this.credential?.accessToken
        this.user = result.user
      }).catch((e) => {
        this.error = { code: e.code, message: e.message }

        this.credential = GoogleAuthProvider.credentialFromError(e)
      })
    this.valid = this.validation()
  }

  async signOut() {
    await signOut(auth)
    this.valid = { answer: false, reason: 'disconected' }
  }

  getCredential() {
    return <OAuthCredential> this.credential
  }

  getToken() {
    return <string> this.token
  }

  getUser() {
    return <User> this.user
  }

  isValid() {
    return <{ answer: boolean; reason: string }> this.valid
  }
}
