import type { LocationItem } from '../../location'
import type { MapData, MapId, MapJson, MapJsonItem } from '../model/types'
import { getMapInfo } from './catalog'

export const parseMapData = (id: MapId, raw: MapJson): MapData => {
  const [width, height, defaultSize, startLocation] = raw[0]

  const items: LocationItem[] = raw[1].map((item: MapJsonItem, index) => {
    const [top, left, links, locationType, size = defaultSize] = item
    return {
      index,
      defaultType: locationType,
      type: locationType,
      top,
      left,
      size,
      links,
    }
  })

  return {
    settings: {
      type: id,
      width,
      height,
      defaultSize,
      startLocation,
    },
    items,
  }
}

export const loadMapData = async (id: MapId): Promise<MapData> => {
  const info = getMapInfo(id)
  if (!info) {
    throw new Error(`Unknown map: ${id}`)
  }

  const response = await fetch(info.data)
  if (!response.ok) {
    throw new Error(`Failed to load map data: ${response.status}`)
  }

  const raw = (await response.json()) as MapJson
  return parseMapData(id, raw)
}

const mapResourceCache = new Map<string, Promise<MapData>>()

export const getMapResource = (id: MapId): Promise<MapData> => {
  const cached = mapResourceCache.get(id)
  if (cached) {
    return cached
  }
  const promise = loadMapData(id)
  mapResourceCache.set(id, promise)
  return promise
}

export const preloadMapAssets = (id: MapId) => {
  const info = getMapInfo(id)
  if (!info || typeof document === 'undefined') {
    return
  }

  const ensureLink = (rel: string, href: string, asType: string) => {
    const selector = `link[data-map-preload="${href}"]`
    if (document.querySelector(selector)) {
      return
    }
    const link = document.createElement('link')
    link.rel = rel
    link.href = href
    link.as = asType
    link.dataset.mapPreload = href
    if (asType === 'fetch') {
      link.crossOrigin = 'anonymous'
    }
    document.head.append(link)
  }

  ensureLink('preload', info.image, 'image')
  ensureLink('preload', info.data, 'fetch')
}
