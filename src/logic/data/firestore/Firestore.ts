import { CollectionReference, collection, doc } from 'firebase/firestore'
import { db } from '../firebase'

export class Firestore {
  private readonly col: CollectionReference

  constructor(col: string | CollectionReference) {
    this.col = collection instanceof CollectionReference ? col : collection(db, col)
  }

  get(doc: string) {
    return doc(db, this.col).get().catch((e) => { console.error(e) })
  }

  getCollection(doc: string, collection: string) {
    return new Firestore(this.collection.doc(doc).collection(collection))
  }

  set(doc: string, params: any) {
    return this.collection.doc(doc).set(params, { merge: true }).catch((e) => { console.error(e) })
  }

  delete(doc: string) {
    return this.collection.doc(doc).delete().catch((e) => { console.error(e) })
  }

  query(condition: { arg1: string; arg2: string; comparator: firestore.WhereFilterOp } | undefined = undefined) {
    if (!condition) return this.collection.get().catch((e) => { console.error(e) })
    return this.collection.where(condition.arg1, condition.comparator, condition.arg2).get().catch((e) => { console.error(e) })
  }

  onCollectionSnapshot(callback: ((querySnapshot: firestore.QuerySnapshot) => null)) {
    return this.collection.onSnapshot(callback)
  }

  onDocSnapshot(doc: string, callback: ((docSnapshot: firestore.DocumentSnapshot) => null)) {
    return this.collection.doc(doc).onSnapshot(callback)
  }
}
