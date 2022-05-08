import { serverTimestamp } from 'firebase/firestore'
import type { User } from '../../auth/User'
import type { FCollection } from '../interface/Collection'
import type { FDocument } from '../interface/Document'
import { Store } from '../interface/Store'

export const convsCache = reactive(new Map<string, Array<{ content: string; author: string; timestamp: number }>>())

export class Conversations {
  public user: User
  public ref: FCollection

  constructor(user: User) {
    this.user = user
    // Todo remplacer le onSnapshot par un truc qui prend les messages dans l'ordre
    this.ref = new Store().getCollection('conversations', true, { where: { param_1: 'users', comparator: 'array-contains', param_2: user.data.uid } })
  }

  getConv(id: string): Conversation {
    return new Conversation(id, this)
  }
}

export class Conversation {
  public convs: Conversations
  public ref: FDocument
  public messagesRef: FCollection
  private _id: string
  // Todo method extandConv qui dont la query à la même tronche que le messageRef, sauf que il y a un where('timestamp', '<', messages[-1].timestamp)
  constructor(id: string, convs: Conversations) {
    this.convs = convs
    this.ref = this.convs.ref.getDocument(id)
    this._id = id

    if (!convsCache.has(id))
      convsCache.set(id, new Array<{ content: string; author: string; timestamp: number }>())

    this.messagesRef = this.ref.getCollection('messages')
    this.messagesRef.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(({ doc }) => {

      })
      convsCache.get(snapshot.docChanges()[0].doc.ref.parent.parent?.id ?? snapshot.docChanges()[0].doc.id)?.sort((a, b) => a.timestamp - b.timestamp)
      console.log(convsCache.get(snapshot.docChanges()[0].doc.ref.parent.parent?.id ?? snapshot.docChanges()[0].doc.id))
    }, { orderBy: { name: 'timestamp', isDesc: true }, limit: 20 })
  }

  async newMessage(content: string) {
    const doc = await this.messagesRef.createDocument({
      content,
      author: this.convs.user.data.uid,
      timestamp: serverTimestamp(),
    })
    return doc.ref.id
  }

  async extandConv() {
    const cache = convsCache.get(this._id)
    const timestamp = cache ? cache[0].timestamp : serverTimestamp()
    const docs = await this.messagesRef.queryDocuments({
      orderBy: { name: 'timestamp', isDesc: true },
      limit: 20,
      where: { param_1: 'timestamp', comparator: '<', param_2: timestamp },
    })
    docs.docs.forEach((doc) => {
      const data = doc.data()
      if (!data) return
      convsCache.get(this._id)?.push({ content: data.content, author: data.author, timestamp: data.timestamp })
    })
    convsCache.get(this._id)?.sort((a, b) => a.timestamp - b.timestamp)
    console.log(convsCache.get(this._id))
    return this.ref
  }
}
