import type { LocationItem } from '../model/types'
import { Terrain } from '../model/types'

export const USER_TERRAINS: Terrain[] = [
  Terrain.SWAMP,
  Terrain.CAVES,
  Terrain.FOREST,
  Terrain.SETTLEMENT,
  Terrain.ABYSS,
]

export const getNextTerrain = (location: LocationItem): Terrain => {
  const cycle = USER_TERRAINS.filter(
    (type) => type !== location.defaultType,
  ).concat([location.defaultType])
  const currentIndex = cycle.indexOf(location.type)
  const nextIndex = currentIndex === cycle.length - 1 ? 0 : currentIndex + 1
  return cycle[nextIndex]
}

export const applyTerrain = (
  locations: LocationItem[],
  location: LocationItem,
  type: Terrain,
): LocationItem[] =>
  locations.map((item) => (item === location ? { ...item, type } : item))

export const resetTerrains = (locations: LocationItem[]): LocationItem[] =>
  locations.map((item) => ({ ...item, type: item.defaultType }))

export const countModifiedLocations = (locations: LocationItem[]) =>
  locations.filter((item) => item.type !== item.defaultType).length
