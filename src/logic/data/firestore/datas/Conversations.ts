import { serverTimestamp } from 'firebase/firestore'
import { user } from '../../auth/auth-manager'
import { Store } from '../interface/Store'

export interface Message { content: string; author: string; timestamp: number }
export interface Conversation { id: string; name: string; entrants: string[]; messages: Array<Message>}

export const convsCache = reactive(new Map<string, Conversation>())

// ! récupère une fois les nouveaux messages et les mets au début car ne les tries pas !
const ref = new Store().getCollection('conversations', true, { where: { param_1: 'entrants', comparator: 'array-contains', param_2: user.value?.uid } })

export const initConvs = async() => {
  const query = await ref.queryDocuments({ where: { param_1: 'entrants', comparator: 'array-contains', param_2: user.value?.uid } })
  query.docs.forEach((qDoc) => {
    convsCache.set(qDoc.id, <Conversation>{ ...qDoc.data(), messages: new Array<Message>() })
    console.log(convsCache.get(qDoc.id))

    const fDoc = ref.getDocument(qDoc.id, false)
    const msgsCol = fDoc.getCollection('messages', false)

    msgsCol.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(({ doc }) => {
        const id = doc.ref.parent.parent?.id
        const data = doc.data()
        if (!id || !data) return
        convsCache.get(id)?.messages.push({ author: data.author, content: data.content, timestamp: data.timestamp })
      })
      convsCache.get(snapshot.docChanges()[0].doc.ref.parent.parent?.id ?? snapshot.docChanges()[0].doc.id)?.messages.sort((a, b) => a.timestamp - b.timestamp)
      console.log(convsCache.get(snapshot.docChanges()[0].doc.ref.parent.parent?.id ?? snapshot.docChanges()[0].doc.id))
    }, { orderBy: { name: 'timestamp', isDesc: true }, limit: 20 })
  })
}

export const getFirstConvId = () => {
  // Todo changer pour mettre la vrai conv
  return 'truc'
}

export const sendMessage = async(id: string, content: string) => {
  const doc = await ref.getDocument(id).getCollection('messages').createDocument({
    content,
    author: user.value?.uid,
    timestamp: serverTimestamp(),
  })
  return doc.ref.id
}

export const extandConv = async(id: string) => {
  const cache = convsCache.get(id)
  if (!cache || !cache.messages[0]) return false
  const timestamp = cache.messages[0].timestamp
  const docs = await ref.getDocument(id).getCollection('messages').queryDocuments({
    orderBy: { name: 'timestamp', isDesc: true },
    limit: 20,
    where: { param_1: 'timestamp', comparator: '<', param_2: timestamp },
  })
  docs.docs.forEach((doc) => {
    const data = doc.data()
    if (!data) return
    convsCache.get(id)?.messages.push({ author: data.author, content: data.content, timestamp: data.timestamp })
  })
  convsCache.get(id)?.messages.sort((a, b) => a.timestamp - b.timestamp)
  console.log(convsCache.get(id))
  return true
}
