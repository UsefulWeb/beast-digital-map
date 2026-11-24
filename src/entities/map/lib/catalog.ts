import { BASE_URL } from '@shared/config'
import {
  MapFamily,
  type MapFamilyInfo,
  MapId,
  type MapInfo,
} from '../model/types'

export const MAP_FAMILIES: MapFamilyInfo[] = [
  { id: MapFamily.BEAST, title: 'Base Maps' },
  { id: MapFamily.SHATTERED_ISLES, title: 'Shattered Isles' },
]

export const MAP_CATALOG: MapInfo[] = [
  {
    id: MapId.DRENCHED_LANDS,
    family: MapFamily.BEAST,
    title: 'the Drenched Lands',
    label: ['the', 'Drenched Lands'],
    image: `${BASE_URL}images/maps/drenched-lands.avif`,
    data: `${BASE_URL}data/map/drenched-lands.json`,
  },
  {
    id: MapId.NORTHERN_EXPANSE,
    family: MapFamily.BEAST,
    title: 'the Northern Expanse',
    label: ['the Northern', 'Expanse'],
    image: `${BASE_URL}images/maps/northern-expanse.avif`,
    data: `${BASE_URL}data/map/northern-expanse.json`,
  },
  {
    id: MapId.UPPER_SHATTERED_ISLES,
    family: MapFamily.SHATTERED_ISLES,
    title: 'Upper Shattered Isles',
    label: ['Upper', 'Shattered Isles'],
    image: `${BASE_URL}images/maps/upper-shattered-isles.avif`,
    data: `${BASE_URL}data/map/upper-shattered-isles.json`,
  },
  {
    id: MapId.LOWER_SHATTERED_ISLES,
    family: MapFamily.SHATTERED_ISLES,
    title: 'Lower Shattered Isles',
    label: ['Lower', 'Shattered Isles'],
    image: `${BASE_URL}images/maps/lower-shattered-isles.avif`,
    data: `${BASE_URL}data/map/lower-shattered-isles.json`,
  },
]

export const getMapInfo = (id: MapId): MapInfo | undefined =>
  MAP_CATALOG.find((item) => item.id === id)

export const getMapsByFamily = (family: MapFamily): MapInfo[] =>
  MAP_CATALOG.filter((item) => item.family === family)

export const isMapId = (value: string): value is MapId => {
  for (const id of Object.values(MapId)) {
    if (id === value) {
      return true
    }
  }
  return false
}

export const isMapFamily = (value: string): value is MapFamily => {
  for (const id of Object.values(MapFamily)) {
    if (id === value) {
      return true
    }
  }
  return false
}
