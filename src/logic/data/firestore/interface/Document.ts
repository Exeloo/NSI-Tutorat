import type { DocumentReference, DocumentSnapshot } from 'firebase/firestore'
import { deleteDoc, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'

import type { Ref } from 'vue'

import { getCache } from '../firestore-cache'
import { FCollection } from './Collection'

export class FDocument {
  private readonly _collection: FCollection
  private readonly _name: string

  private readonly _ref: DocumentReference

  public data: Ref<Object>

  constructor(collection: FCollection, name: string) {
    this._collection = collection

    this._name = name

    this._ref = doc(this._collection.ref, this._name)

    this.data = ref<Object>(<Object> this._collection.cache.get(this._name))

    // onSnapshot(this._ref, this._onSnapshot)
  }

  async get() {
    const cacheData = this._collection.cache.get(this._name)
    if (!cacheData)
      await this.updateData()
    return <Object> this._collection.cache.get(this._name)
  }

  set(data: Object) {
    return setDoc(this._ref, data, { merge: true })
  }

  delete() {
    return deleteDoc(this._ref)
  }

  async updateData() {
    const doc = await getDoc(this._ref)
    const data = doc.data()
    if (!data) return
    this._collection.cache.set(this._name, data)
  }

  getCollection(name: string, isListen: boolean): FCollection {
    return new FCollection(this._collection.store, name, isListen, this)
  }

  private _onSnapshot(snapshot: DocumentSnapshot): void {
    const data = snapshot?.data()
    if (!data) return
    getCache(snapshot.ref.parent.id).set(snapshot.id, data)
  }

  onSnapshot(callback: (snapshot: DocumentSnapshot) => void): void {
    onSnapshot(this._ref, callback)
  }

  get ref() {
    return this._ref
  }
}
