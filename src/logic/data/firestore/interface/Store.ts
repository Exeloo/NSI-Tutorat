import type { Firestore } from 'firebase/firestore'
import { db } from '../../firebase'
import { FCollection } from './Collection'

export class Store {
  /**
   * Todo classe unique a appeler lorsque qu'on veut
   * * Method getCollection qui nous renvoie un object "Collection" dans interface
   * * -> Method qui a 1 params : le name de la collection
   * * -> Class qui a 2 params : db (pour ne pas l'appeler dans la classe), et le name
   * * Class Collection qui aura une method getDocument qui renvoie un "Document"
   * * -> Method qui prend en param le nom du doc
   * * -> Class qui prend en params la collection et le nom
   * * Les autres classes de datas appeleront cette classe
   */

  public readonly db: Firestore

  constructor() {
    this.db = db
  }

  getCollection(name: string, isListen: boolean) {
    return new FCollection(this, name, isListen)
  }
}
