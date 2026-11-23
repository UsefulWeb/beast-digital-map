import { BoardFrame, BoardImage } from '@entities/board'
import { GameMode, selectMode, useGameStore } from '@entities/game'
import {
  changeLocationType,
  getNextTerrain,
  Location,
  selectLocations,
  useLocationsStore,
} from '@entities/location'
import {
  addPathItem,
  canClickLocation,
  getLocationVisitsCount,
  getLocationWait,
  isLocationFirst,
  isLocationLast,
  isNextLocation,
  selectPathData,
  usePathStore,
} from '@entities/path'
import { PathLayer } from '@features/draw-path'
import { Movements } from '@features/view-movements'
import { px } from '@shared/lib/math'

export type BoardMapProps = {
  src: string
  width: number
  height: number
  ratio: number
}

export const BoardMap = (props: BoardMapProps) => {
  const { width, height, ratio, src } = props
  const mode = useGameStore(selectMode)
  const locations = useLocationsStore(selectLocations)
  const path = usePathStore(selectPathData)

  const onLocationClick = (item: (typeof locations)[number]) => {
    if (mode === GameMode.LOCATIONS) {
      changeLocationType(item, getNextTerrain(item))
      return
    }
    if (!canClickLocation(path, item)) {
      return
    }
    addPathItem(item)
  }

  return (
    <BoardFrame width={px(width)} height={px(height)}>
      <BoardImage src={src} dimmed={mode === GameMode.MOVEMENT}>
        {mode !== GameMode.MOVEMENT &&
          locations.map((item) => (
            <Location
              key={item.index}
              {...item}
              onClick={() => onLocationClick(item)}
              isFirst={isLocationFirst(path, item)}
              isLast={isLocationLast(path, item)}
              isNext={isNextLocation(path, item)}
              waitList={getLocationWait(path, item)}
              visitsCount={getLocationVisitsCount(path, item)}
              type={item.type}
              isDefaultType={item.type === item.defaultType}
              ratio={ratio}
              gameMode={mode}
            />
          ))}
        {mode === GameMode.PATH && (
          <PathLayer width={width} height={height} ratio={ratio} />
        )}
        {mode === GameMode.MOVEMENT && <Movements />}
      </BoardImage>
    </BoardFrame>
  )
}
