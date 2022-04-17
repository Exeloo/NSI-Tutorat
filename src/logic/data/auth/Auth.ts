import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import type { OAuthCredential, User } from 'firebase/auth'
import { auth, provider } from '../firebase'

/**
 * * Class for manage Firebase authentication with Google.
 *
 * @export
 * @class Auth
 */
export class Auth {
  private _credential: OAuthCredential | null | undefined
  private _token: string | undefined
  private _user: User | undefined
  private _error: { code: any; message: any } | undefined
  private _valid: { answer: boolean; reason: string } | undefined

  /**
   * * Creates an instance of Auth.
   *
   * @memberof Auth
   */
  constructor() {
    this._valid = undefined
  }

  /**
   * * Test if authentication work and if email is a pedagogiefde's one.
   *
   * @private
   * @return { answer: boolean; reason: string }
   * @memberof Auth
   */
  private validation(): { answer: boolean; reason: string } {
    if (!this._token || !this._user) {
      const error = this._error ? this._error : { code: 'undefined', message: 'Erreur inconue' }
      return { answer: false, reason: `Code : ${error.code}, Erreur : ${error.message}` }
    }
    if (!this.user.email?.endsWith('@pedagogiefde.org'))
      return { answer: false, reason: 'Email invalide, veuillez mettre une adresse mail du lycée François d\'Estaing !' }

    return { answer: true, reason: 'Ok' }
  }

  /**
   * * SignIn with Google Authentication.
   *
   * @memberof Auth
   */
  async signIn() {
    try {
      const result = await signInWithPopup(auth, provider)
      this._credential = GoogleAuthProvider.credentialFromResult(result)
      this._token = this._credential?.accessToken
      this._user = result.user
    }
    catch (e) {
      this._error = { code: e.code, message: e.message }

      this._credential = GoogleAuthProvider.credentialFromError(e)
    }
    this._valid = this.validation()
  }

  /**
   * * SignOut the user.
   *
   * @memberof Auth
   */
  async signOut() {
    await signOut(auth)
    this._valid = { answer: false, reason: 'disconected' }
  }

  /**
   * * Get private credential.
   *
   * @readonly
   * @memberof Auth
   */
  get credential() {
    return <OAuthCredential> this._credential
  }

  /**
   * * Get private token.
   *
   * @readonly
   * @memberof Auth
   */
  get token() {
    return <string> this._token
  }

  /**
   * * Get private user.
   *
   * @readonly
   * @memberof Auth
   */
  get user() {
    return <User> this._user
  }

  /**
   * * Get private valid, this const is use to check if auth is valid.
   *
   * @readonly
   * @memberof Auth
   */
  get valid() {
    return <{ answer: boolean; reason: string }> this._valid
  }
}
