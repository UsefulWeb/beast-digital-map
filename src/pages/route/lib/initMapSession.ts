import { GameMode, setGameMode } from '@entities/game'
import { setLocations, useLocationsStore } from '@entities/location'
import type { MapData, MapId } from '@entities/map'
import { startFrom } from '@entities/path'

/** Seed stores for a freshly opened map board. */
export const initMapSession = (mapId: MapId, data: MapData) => {
  const startLocation = data.items[data.settings.startLocation]
  setGameMode(GameMode.PATH)
  setLocations(data.items)
  useLocationsStore.getState().setMapId(mapId)
  startFrom(startLocation)
}
