import firebase from 'firebase/compat'
import { Store } from '../interface/Store'
import type { FDocument } from '../interface/Document'
import type { PlanningType } from '~/logic/profil/planning/planning-type'
import type { PartialSchoolPreferencesType, SchoolPreferencesType } from '~/logic/profil/school/school-type'

import Timestamp = firebase.firestore.Timestamp

export interface UserData {
  avatar: string
  birthday: Timestamp
  description: string
  displayName: string
  email: string
  gender: string
  planning: PlanningType
  school: SchoolPreferencesType
  uid: string
}

export interface PartialUserData {
  avatar?: string
  birthday?: Timestamp
  description?: string
  displayName?: string
  email?: string
  gender?: string
  planning?: PlanningType
  school?: PartialSchoolPreferencesType
  uid?: string
}
const store = new Store().getCollection('users')
const usersCache = new Map<string, UserData>()
export class User {
  private readonly _doc: FDocument

  constructor(name: string) {
    this._doc = store.getDocument(name, true)
  }

  getUser() {
    return <Promise<UserData>> this._doc.get()
  }

  setUser(data: PartialUserData) {
    return this._doc.set(data)
  }
}

export const getForcedUsers = async(): Promise<Map<string, UserData>> => {
  const query = await store.queryDocuments({ where: { param_1: 'school.tutorat.helper.wish', comparator: '==', param_2: true } })
  query.docs.forEach((v) => {
    usersCache.set(v.id, <UserData>v.data())
  })
  return usersCache
}

export const getUsers = () => usersCache
