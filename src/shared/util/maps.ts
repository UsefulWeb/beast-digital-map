import { MapType } from './interfaces'

const base = import.meta.env.BASE_URL

export interface IMapInfo {
  image: string
  data: string
}

export type IMapCollection = {
  [index: string]: IMapInfo
}

export const maps: IMapCollection = {
  [MapType.DRENCHED_LANDS]: {
    image: `${base}images/maps/drenched-lands.png`,
    data: `${base}data/map/drenched-lands.json`,
  },
  [MapType.NORTHERN_EXPANSE]: {
    image: `${base}images/maps/northern-expanse.png`,
    data: `${base}data/map/northern-expanse.json`,
  },
}
