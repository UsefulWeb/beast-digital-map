import { GameMode } from '@entities/game/model'
import type { LocationItem, Terrain } from '../model/types'

export type LocationViewFlags = {
  isSelected: boolean
  isPathMode: boolean
  isLocationsMode: boolean
  isMeepleMode: boolean
  isHuntersMode: boolean
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
    isMeepleMode: gameMode === GameMode.MEEPLE,
    isHuntersMode: gameMode === GameMode.HUNTERS,
    isDefaultType: location.type === location.defaultType,
    terrain: location.type,
  }
}
