import { GameMode } from '@entities/game/model'
import type { LocationItem, Terrain } from '../model/types'

export type LocationViewFlags = {
  isSelected: boolean
  isPathMode: boolean
  isLocationsMode: boolean
  isDefaultType: boolean
  terrain: Terrain
}

export const getLocationViewFlags = (options: {
  visitsCount: number
  gameMode: GameMode
  location: LocationItem
}): LocationViewFlags => {
  const { visitsCount, gameMode, location } = options
  return {
    isSelected: visitsCount > 0,
    isPathMode: gameMode === GameMode.PATH,
    isLocationsMode: gameMode === GameMode.LOCATIONS,
    isDefaultType: location.type === location.defaultType,
    terrain: location.type,
  }
}
