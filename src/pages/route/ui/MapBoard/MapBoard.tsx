import { getMapInfo, type MapId, readMapData } from '@entities/map'
import { MAP_DEBUG } from '@shared/config'
import { useFullscreen } from '@shared/lib'
import { Board } from '@widgets/board'
import { useMapSessionBootstrap } from '../../lib'

export type MapBoardProps = {
  mapId: MapId
}

export const MapBoard = (props: MapBoardProps) => {
  const { mapId } = props
  const data = readMapData(mapId)
  const info = getMapInfo(mapId)

  useMapSessionBootstrap(mapId, data)
  useFullscreen(!MAP_DEBUG)

  if (!info) {
    throw new Error(`Unknown map: ${mapId}`)
  }

  return <Board mapUrl={info.image} data={data} />
}
