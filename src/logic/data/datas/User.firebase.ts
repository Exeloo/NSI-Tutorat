import { collection, deleteDoc, doc, getDoc, query, setDoc, where } from 'firebase/firestore'
import type { DocumentReference, WhereFilterOp } from 'firebase/firestore'
import { db } from '~/logic/data/firebase'

export class User {
  public ref: DocumentReference | undefined

  constructor(id: string | undefined = undefined) {
    this.ref = id ? doc(db, 'user', id) : undefined
  }

  get get() {
    if (!this.ref) return undefined
    return getDoc(this.ref)
  }

  set(params: UserType) {
    if (!this.ref) return undefined
    return setDoc(this.ref, params, { merge: true })
  }

  delete() {
    if (!this.ref) return undefined
    return deleteDoc(this.ref)
  }

  query(condition: { arg1: string; arg2: string; comparator: WhereFilterOp } | undefined = undefined) {
    if (!condition) return query(collection(db, 'user'))
    return query(collection(db, 'user'), where(condition.arg1, condition.comparator, condition.arg2))
  }
}

interface UserType {
  name: string | null
}
