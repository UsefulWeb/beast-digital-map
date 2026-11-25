import { fetchJson } from '@shared/api'
import { type LocationItem, MapMeepleType, toMeeple } from '../../location'
import type { MapData, MapId, MapJson, MapJsonItem } from '../model/types'
import { getMapInfo } from './catalog'

export const parseMapData = (id: MapId, raw: MapJson): MapData => {
  const [width, height, defaultSize, startLocation] = raw[0]

  const items: LocationItem[] = raw[1].map((item: MapJsonItem, index) => {
    const [top, left, links, locationType, sizeRaw, meepleTypeRaw] = item
    const size = sizeRaw ?? defaultSize
    const defaultMeepleType =
      (meepleTypeRaw as MapMeepleType | undefined) ?? MapMeepleType.NO_MEEPLE

    return {
      index,
      defaultType: locationType,
      type: locationType,
      top,
      left,
      size,
      links,
      defaultMeepleType,
      meeple: toMeeple(defaultMeepleType),
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

  const raw = await fetchJson<MapJson>(info.data)
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
