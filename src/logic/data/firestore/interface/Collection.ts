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

  public doc: FDocument | undefined

  constructor(store: Store, name: string, isListen = false, doc?: FDocument) {
    this.store = store
    this.ref = doc ? collection(doc.ref, name) : collection(store.db, name)
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

  getDocument(name: string, isListen?: boolean): FDocument {
    return new FDocument(this, name, isListen)
  }

  async createDocument(data: Object, isListen?: boolean): Promise<FDocument> {
    const docRef = await addDoc(this.ref, data)
    return new FDocument(this, docRef.id, isListen)
  }

  queryDocuments(q?: Query): Promise<QuerySnapshot> {
    return getDocs(q ? query(this.ref, where(q.param_1, q.comparator, q.param_2)) : query(this.ref))
  }

  onSnapshot(callback: (snapshot: QuerySnapshot) => void): void {
    onSnapshot(this.ref, callback)
  }
}
