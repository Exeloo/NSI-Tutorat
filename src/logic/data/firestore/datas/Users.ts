import { Store } from '../interface/Store'
import type { FDocument } from '../interface/Document'
import type { PlanningType } from '~/logic/profil/planning/planning-type'
import type { PartialSchoolPreferencesType, SchoolPreferencesType } from '~/logic/profil/school/school-type'
import type { NotificationType } from '~/logic/profil/notification/notification-type'
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface UserData {
  avatar: string
  displayName: string
  email: string
  freeTime: PlanningType
  planning: PlanningType
  school: SchoolPreferencesType
  uid: string
  notification: NotificationType
  description: string
  genre: string
  birthday: Timestamp
}

export interface PartialUserData {
  avatar?: string
  displayName?: string
  email?: string
  freeTime?: PlanningType
  planning?: PlanningType
  school?: PartialSchoolPreferencesType
  uid?: string
  notification?: NotificationType
  description?: string
  genre?: string
  birthday?: Timestamp
}

export class Users {
  private readonly _doc: FDocument

  constructor(name: string) {
    this._doc = new Store().getCollection('users').getDocument(name, true)
  }

  getUser() {
    return <Promise<UserData>> this._doc.get()
  }

  setUser(data: PartialUserData) {
    return this._doc.set(data)
  }
}
