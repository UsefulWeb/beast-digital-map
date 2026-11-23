import { useEffect, useState } from 'react'
import { useParams } from 'wouter'
import { MapController } from '../../../components/organisms/MapController/MapController'
import { useGameModeStore } from '../../../features/gameMode/gameModeSlice'
import { useLocationsStore } from '../../../features/locations/locationsSlice'
import { usePathStore } from '../../../features/path/pathSlice'
import { useImageDownloadProgress } from '../../../shared/lib'
import { Progress } from '../../../shared/ui'
import { GameMode } from '../../../shared/util/common'
import {
  type IMapData,
  type IMapJSONData,
  type IMapJSONItem,
  MapType,
} from '../../../shared/util/interfaces'
import { maps } from '../../../shared/util/maps'
import S from './Route.module.scss'

const loadMapData = async (type: MapType): Promise<IMapData | null> => {
  if (type === MapType.NONE || !maps[type]) {
    return null
  }

  const url = maps[type].data
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to load map data: ${response.status}`)
  }
  const data = (await response.json()) as IMapJSONData

  const [width, height, defaultSize, startLocation] = data[0]

  const items = data[1].map((item: IMapJSONItem, index) => {
    const [top, left, links, locationType, size = defaultSize] = item
    return {
      index,
      defaultType: locationType,
      type: locationType,
      top,
      left,
      size,
      links,
    }
  })

  return {
    settings: {
      type,
      width,
      height,
      defaultSize,
      startLocation,
    },
    items,
  }
}

export const Route = () => {
  const params = useParams<{ type: string }>()
  const type = (params.type as MapType) || MapType.NONE
  const [mapData, setMapData] = useState<IMapData | null>(null)

  const mapInfo = maps[type]
  const progress = useImageDownloadProgress(mapInfo?.image ?? '')

  const setGameMode = useGameModeStore((s) => s.setGameMode)
  const setLocations = useLocationsStore((s) => s.setLocations)
  const startFrom = usePathStore((s) => s.startFrom)

  useEffect(() => {
    let cancelled = false
    loadMapData(type).then((data) => {
      if (!cancelled) {
        setMapData(data)
      }
    })
    return () => {
      cancelled = true
    }
  }, [type])

  useEffect(() => {
    if (!mapData) {
      return
    }
    const startLocation = mapData.items[mapData.settings.startLocation]
    setGameMode(GameMode.PATH)
    setLocations(mapData.items)
    startFrom(startLocation)
  }, [mapData, setGameMode, setLocations, startFrom])

  const isLoaded = Boolean(mapData) && progress === 100

  return (
    <div className={S.container}>
      {!isLoaded || !mapData ? (
        <Progress value={progress} />
      ) : (
        <MapController mapUrl={mapInfo.image} data={mapData} />
      )}
    </div>
  )
}
