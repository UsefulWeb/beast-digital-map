import type { LocationItem, Terrain } from '@entities/location'

export const MapFamily = {
  BEAST: 'beast',
  SHATTERED_ISLES: 'shattered-isles',
} as const

export type MapFamily = (typeof MapFamily)[keyof typeof MapFamily]

export const MapId = {
  DRENCHED_LANDS: 'drenched-lands',
  NORTHERN_EXPANSE: 'northern-expanse',
  UPPER_SHATTERED_ISLES: 'upper-shattered-isles',
  LOWER_SHATTERED_ISLES: 'lower-shattered-isles',
} as const

export type MapId = (typeof MapId)[keyof typeof MapId]

export type MapSize = {
  width: number
  height: number
  ratio?: number
}

export type MapData = {
  settings: {
    type: MapId
    width: number
    height: number
    defaultSize: number
    startLocation: number
  }
  items: LocationItem[]
}

export type MapJsonSettings = [
  width: number,
  height: number,
  defaultSize: number,
  startLocation: number,
]

export type MapJsonItem = [
  top: number,
  left: number,
  links: number[],
  type: Terrain,
  size: number | undefined,
]

export type MapJson = [MapJsonSettings, MapJsonItem[]]

export type MapInfo = {
  id: MapId
  family: MapFamily
  title: string
  /** Optional multi-line label for home buttons */
  label: string[]
  image: string
  data: string
}

export type MapFamilyInfo = {
  id: MapFamily
  title: string
}
