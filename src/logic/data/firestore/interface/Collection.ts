import type { CollectionReference, QuerySnapshot } from 'firebase/firestore'
import { addDoc, collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import type { Query } from '../firestore-types'
import { getCache } from '../firestore-cache'
import { FDocument } from './Document'
import type { Store } from './Store'

export class FCollection {
  public readonly store: Store
  public readonly ref: CollectionReference
  public cache: Map<string, Object>

  constructor(store: Store, name: string, isListen: boolean, doc?: FDocument) {
    this.store = store
    this.ref = collection(store.db, name)
    this.cache = getCache(name)

    if (isListen)
      onSnapshot(this.ref, this._onSnapshot)
  }

  private _onSnapshot(querySnapshot: QuerySnapshot): void {
    querySnapshot.forEach((snapshot) => {
      const data = snapshot?.data()
      if (!data) return
      getCache(snapshot.ref.parent.id).set(snapshot.id, data)
    })
  }
}
