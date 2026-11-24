import { BASE_URL } from '@shared/config'
import { Terrain } from '../model/types'

export type TerrainImage = {
  url: string
  size: number
}

export const TERRAIN_IMAGES: Record<Terrain, TerrainImage> = {
  [Terrain.CAVES]: {
    url: `${BASE_URL}images/locations/caves.avif`,
    size: 66,
  },
  [Terrain.FOREST]: {
    url: `${BASE_URL}images/locations/forest.avif`,
    size: 66,
  },
  [Terrain.MIXED]: {
    url: `${BASE_URL}images/locations/mixed.avif`,
    size: 69,
  },
  [Terrain.SETTLEMENT]: {
    url: `${BASE_URL}images/locations/settlement.avif`,
    size: 127,
  },
  [Terrain.SWAMP]: {
    url: `${BASE_URL}images/locations/swamp.avif`,
    size: 66,
  },
}
