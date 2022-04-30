import type { DocumentReference, DocumentSnapshot } from 'firebase/firestore'
import { deleteDoc, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { FCollection } from './Collection'

export class FDocument {
  public collection: FCollection
  public ref: DocumentReference
  public name: string

  constructor(collection: FCollection, name: string, isListen: boolean) {
    this.collection = collection
    this.ref = doc(collection.ref, name)
    this.name = name

    if (isListen)
      onSnapshot(this.ref, this._onSnapshot)
  }

  async get() {
    const cacheData = this.collection.cache.get(this.name)
    if (!cacheData)
      await this.updateData()
    return <Object> this.collection.cache.get(this.name)
  }

  set(data: Object) {
    return setDoc(this.ref, data, { merge: true })
  }

  delete() {
    return deleteDoc(this.ref)
  }

  async updateData() {
    const doc = await getDoc(this.ref)
    const data = doc.data()
    if (!data) return
    this.collection.cache.set(this.name, data)
  }

  getCollection(name: string, isListen: boolean): FCollection {
    return new FCollection(this.collection.store, name, isListen, this)
  }

  private _onSnapshot(snapshot: DocumentSnapshot): void {
    const data = snapshot?.data()
    if (!data) return
    this.collection.cache.set(snapshot.id, data)
  }

  onSnapshot(callback: (snapshot: DocumentSnapshot) => void): void {
    onSnapshot(this.ref, callback)
  }
}
