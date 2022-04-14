export const firestoreCache = reactive(new Map<string, Map<string, Object>>())

export const getCache = (name: string) => {
  if (!firestoreCache.has(name)) {
    const newCache = new Map<string, Object>()
    firestoreCache.set(name, newCache)
  }
  return <Map<string, Object>> firestoreCache.get(name)
}
