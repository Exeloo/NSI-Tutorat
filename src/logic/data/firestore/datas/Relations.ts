import { Store } from '../interface/Store'
import { user } from '../../auth/auth-manager'

export interface RelationData {
  statut: 'ok' | 'asking' | 'canceling'
  entrants: string[]
  helpers: string[]
  receivers: string[]
  time: {
    day: string
    start: string
    end: string
  }
  subjects: string[]
}

export interface PartialRelationData {
  statut?: 'ok' | 'asking' | 'canceling'
  entrants?: string[]
  helpers?: string[]
  receivers?: string[]
  time?: {
    day?: string
    start?: string
    end?: string
  }
  subjects?: string[]
}
const store = new Store().getCollection('relations')
const relationsCache = new Map<string, RelationData>()

export const getRelations = async() => {
  if (relationsCache.size === 0) {
    store.onSnapshot((snapshots) => {
      snapshots.docChanges().forEach((snap) => {
        relationsCache.set(snap.doc.id, <RelationData>snap.doc.data())
      })
    }, { where: { param_1: 'entrants', comparator: 'array-contains', param_2: user.value?.uid } })
    const query = await store.queryDocuments({ where: { param_1: 'entrants', comparator: 'array-contains', param_2: user.value?.uid } })
    query.docs.forEach((doc) => {
      relationsCache.set(doc.id, <RelationData>doc.data())
    })
  }
  return relationsCache
}

// export const getRelations = () => {
//   return relationsCache
// }

// export const getForcedRelations = async() => {
//   store.onSnapshot((snapshots) => {
//     snapshots.docChanges().forEach((snap) => {
//       relationsCache.set(snap.doc.id, <RelationData>snap.doc.data())
//     })
//   }, { where: { param_1: 'entrants', comparator: 'array-contains', param_2: user.value?.uid } })
//   const query = await store.queryDocuments({ where: { param_1: 'entrants', comparator: 'array-contains', param_2: user.value?.uid } })
//   query.docs.forEach((doc) => {
//     relationsCache.set(doc.id, <RelationData>doc.data())
//   })
//   return relationsCache
// }

export const createRelation = (data: PartialRelationData) => {
  return store.createDocument(data)
}

export const setRelation = (id: string, data: PartialRelationData) => {
  return store.getDocument(id).set(data)
}

export const relationSetUserStatut = (id: string, uid: string, data: { statut: 'accepted' | 'refused' | 'leaved'; return?: string }) => {
  return store.getDocument(id).getCollection('entrants').getDocument(uid).set(data)
}

export const getEntrants = async(id: string) => {
  const map = new Map<string, { statut: 'accepted' | 'refused' | 'leaved'; return: string }>()
  const q = await store.getDocument(id).getCollection('entrants').queryDocuments()
  q.forEach((snapshot) => {
    const data = <{ statut: 'accepted' | 'refused' | 'leaved'; return: string }>snapshot.data()
    map.set(snapshot.id, data)
  })
  return map
}

export const hasRelationAccept = (data?: { statut: 'accepted' | 'refused' | 'leaved'; return: string }) => {
  return !!data && data.statut === 'accepted'
}

export const hasRelationResponse = (data?: { statut: 'accepted' | 'refused' | 'leaved'; return: string }) => {
  return !!data
}

export const hasRelationDeny = (data?: { statut: 'accepted' | 'refused' | 'leaved'; return: string }) => {
  return !!data && data.statut === 'refused'
}

export const hasRelationLeft = (data?: { statut: 'accepted' | 'refused' | 'leaved'; return: string }) => {
  return !!data && data.statut !== 'accepted'
}

