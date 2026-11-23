import { BASE_URL } from '@shared/config'
import { MapId, type MapInfo } from '../model/types'

export const MAP_CATALOG: MapInfo[] = [
  {
    id: MapId.DRENCHED_LANDS,
    title: 'the Drenched Lands',
    image: `${BASE_URL}images/maps/drenched-lands.png`,
    data: `${BASE_URL}data/map/drenched-lands.json`,
  },
  {
    id: MapId.NORTHERN_EXPANSE,
    title: 'the Northern Expanse',
    image: `${BASE_URL}images/maps/northern-expanse.png`,
    data: `${BASE_URL}data/map/northern-expanse.json`,
  },
]

export const getMapInfo = (id: MapId): MapInfo | undefined =>
  MAP_CATALOG.find((item) => item.id === id)

export const isMapId = (value: string): value is MapId =>
  Object.values(MapId).includes(value as MapId)
