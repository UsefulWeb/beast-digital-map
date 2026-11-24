import type { MapData, MapId } from '@entities/map'
import { useEffect } from 'react'
import { initMapSession } from './initMapSession'

/** Run `initMapSession` when map data changes. */
export const useMapSessionBootstrap = (mapId: MapId, data: MapData) => {
  useEffect(() => {
    initMapSession(mapId, data)
  }, [mapId, data])
}
