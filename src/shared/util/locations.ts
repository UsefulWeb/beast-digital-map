import { MapLocationType } from './interfaces'

const base = import.meta.env.BASE_URL

export interface MapLocationListItem {
  url: string
  size: number
}

export const USER_LOCATION_TYPES = [
  MapLocationType.SWAMP,
  MapLocationType.CAVES,
  MapLocationType.FOREST,
  MapLocationType.SETTLEMENT,
]

export const MapLocationImageList = {
  [MapLocationType.CAVES]: {
    url: `${base}images/locations/caves.png`,
    size: 66,
  },
  [MapLocationType.FOREST]: {
    url: `${base}images/locations/forest.png`,
    size: 66,
  },
  [MapLocationType.MIXED]: {
    url: `${base}images/locations/mixed.png`,
    size: 69,
  },
  [MapLocationType.SETTLEMENT]: {
    url: `${base}images/locations/settlement.png`,
    size: 127,
  },
  [MapLocationType.SWAMP]: {
    url: `${base}images/locations/swamp.png`,
    size: 66,
  },
}
