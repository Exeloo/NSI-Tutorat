export const cache = reactive(new Map<string, Map<string, Object>>())

export class FCache {
  private readonly _name: string
  private readonly _cache: Map<string, Object>

  constructor(name: string) {
    this._name = name
    if (cache.has(name)) {
      this._cache = <Map<string, Object>> cache.get(name)
    }
    else {
      this._cache = new Map<string, Object>()
      cache.set(this._name, this._cache)
    }
  }

  set(name: string, data: Object) {
    this._cache.set(name, data)
    console.log(cache.get(this._name)?.get(name))
  }

  get(name: string) {
    return [cache.get(this._name)?.get(name), this._cache.get(name)]
  }
}
