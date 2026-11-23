import type { LocationItem, Terrain } from '@entities/location'

export enum MapId {
  DRENCHED_LANDS = 'drenched-lands',
  NORTHERN_EXPANSE = 'northern-expanse',
}

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
  title: string
  image: string
  data: string
}
