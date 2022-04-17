import type { CollectionReference, QuerySnapshot } from 'firebase/firestore'
import { addDoc, collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import type { Query } from '../firestore-types'
import { getCache } from '../firestore-cache'
import { FDocument } from './Document'
import type { Store } from './Store'

export class FCollection {
  private readonly _store: Store
  private readonly _name: string
  private readonly _document: FDocument | undefined
  private readonly _cache: Map<string, Object>

  private readonly _ref: CollectionReference

  constructor(store: Store, name: string, isListen: boolean, document?: FDocument) {
    this._store = store
    this._name = name
    this._document = document

    this._ref = this._document ? collection(this._document.ref, this._name) : collection(this._store.db, this._name)
    this._cache = getCache(name)

    // const snapshotQuery = q ? query(this._ref, where(q.param_1, q.comparator, q.param_2)) : query(this._ref)
    if (isListen)
      onSnapshot(this._ref, this._onSnapshot)
  }

  private _onSnapshot(querySnapshot: QuerySnapshot): void {
    querySnapshot.forEach((snapshot) => {
      const data = snapshot?.data()
      if (!data) return
      getCache(snapshot.ref.parent.id).set(snapshot.id, data)
    })
  }

  getDocument(name: string): FDocument {
    return new FDocument(this, name)
  }

  async createDocument(data: Object): Promise<FDocument> {
    const docRef = await addDoc(this._ref, data)
    return new FDocument(this, docRef.id)
  }

  queryDocuments(q?: Query): Promise<QuerySnapshot> {
    return getDocs(q ? query(this._ref, where(q.param_1, q.comparator, q.param_2)) : query(this._ref))
  }

  onSnapshot(callback: (snapshot: QuerySnapshot) => void): void {
    onSnapshot(this._ref, callback)
  }

  get store() {
    return this._store
  }

  get name() {
    return this._name
  }

  get document() {
    return this._document
  }

  get ref() {
    return this._ref
  }

  get cache() {
    return this._cache
  }
}
