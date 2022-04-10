import type { CollectionReference, DocumentData, QuerySnapshot } from 'firebase/firestore'
import { addDoc, collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'

import type { Query } from '../types'

import { FDocument } from './Document'
import type { Store } from './Store'

// Todo systeme de cache

export class FCollection {
  private readonly _store: Store
  private readonly _name: string
  private readonly _document: FDocument | undefined

  private readonly _collection: CollectionReference

  constructor(store: Store, name: string, doc: FDocument | undefined = undefined) {
    this._store = store
    this._name = name
    this._document = doc

    this._collection = collection(this._store.db, this._name)
  }

  getDocument(name: string): FDocument {
    return new FDocument(this, name)
  }

  async createDocument(data: Object): Promise<FDocument> {
    const docRef = await addDoc(this._collection, data)
    return new FDocument(this, docRef.id)
  }

  queryDocuments(q: Query | undefined = undefined): Promise<QuerySnapshot<DocumentData>> {
    return getDocs(q ? query(this._collection, where(q.param_1, q.comparator, q.param_2)) : query(this._collection))
  }

  onChange(callback: (snapshot: QuerySnapshot<DocumentData>) => void): void {
    onSnapshot(this._collection, callback)
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

  get collection() {
    return this._collection
  }
}
