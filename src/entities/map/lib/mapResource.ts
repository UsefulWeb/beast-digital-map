import type { MapData, MapId } from '../model/types'
import { loadMapData } from './loadMap'

type Resource =
  | { status: 'pending'; promise: Promise<MapData> }
  | { status: 'success'; data: MapData }
  | { status: 'error'; error: Error }

const cache = new Map<string, Resource>()

export const readMapData = (id: MapId): MapData => {
  const cached = cache.get(id)
  if (cached?.status === 'success') {
    return cached.data
  }
  if (cached?.status === 'error') {
    throw cached.error
  }
  if (cached?.status === 'pending') {
    throw cached.promise
  }

  const promise = loadMapData(id)
    .then((data) => {
      cache.set(id, { status: 'success', data })
      return data
    })
    .catch((error: Error) => {
      cache.set(id, { status: 'error', error })
      throw error
    })

  cache.set(id, { status: 'pending', promise })
  throw promise
}

export const clearMapResource = (id?: MapId) => {
  if (id) {
    cache.delete(id)
    return
  }
  cache.clear()
}
