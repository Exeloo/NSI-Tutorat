import type { DocumentReference } from 'firebase/firestore'
import type { FCollection } from './Collection'

export class FDocument {
  private readonly _collection: FCollection
  private readonly _name: string

  private readonly _document: DocumentReference

  constructor(collection: FCollection, name: string) {
    this._collection = collection
    this._name = name
  }
}
