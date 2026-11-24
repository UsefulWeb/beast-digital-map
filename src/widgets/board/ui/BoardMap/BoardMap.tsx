import { BoardFrame, BoardImage } from '@entities/board'
import {
  GameMode,
  selectMode,
  selectPathLinksLocked,
  useGameStore,
} from '@entities/game'
import {
  changeLocationType,
  cycleLocationMeeple,
  getNextTerrain,
  injureLocationMeeple,
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
import { MAP_DEBUG } from '@shared/config'
import { px } from '@shared/lib/math'
import { useState } from 'react'

export type BoardMapProps = {
  src: string
  width: number
  height: number
  ratio: number
}

export const BoardMap = (props: BoardMapProps) => {
  const { width, height, ratio, src } = props
  const mode = useGameStore(selectMode)
  const pathLinksLocked = useGameStore(selectPathLinksLocked)
  const locations = useLocationsStore(selectLocations)
  const path = usePathStore(selectPathData)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const hovered =
    MAP_DEBUG && hoveredIndex != null
      ? locations.find((loc) => loc.index === hoveredIndex)
      : null
  const linkedSet = hovered ? new Set(hovered.links ?? []) : null

  const onLocationClick = (item: (typeof locations)[number]) => {
    if (mode === GameMode.LOCATIONS) {
      changeLocationType(item, getNextTerrain(item))
      return
    }
    if (mode === GameMode.MEEPLE) {
      cycleLocationMeeple(item)
      return
    }
    if (mode === GameMode.HUNTERS) {
      return
    }
    if (
      mode !== GameMode.PATH ||
      !canClickLocation(path, item, pathLinksLocked)
    ) {
      return
    }
    addPathItem(item)
  }

  return (
    <BoardFrame width={px(width)} height={px(height)}>
      <BoardImage src={src} dimmed={mode === GameMode.MOVEMENT}>
        {mode !== GameMode.MOVEMENT &&
          locations.map((item) => {
            const debugLink = !MAP_DEBUG
              ? undefined
              : hoveredIndex === item.index
                ? 'active'
                : linkedSet?.has(item.index)
                  ? 'linked'
                  : undefined

            return (
              <Location
                key={item.index}
                {...item}
                onClick={() => onLocationClick(item)}
                onMeepleInjure={() => injureLocationMeeple(item)}
                {...(MAP_DEBUG ? { onHover: setHoveredIndex, debugLink } : {})}
                isFirst={isLocationFirst(path, item)}
                isLast={isLocationLast(path, item)}
                isNext={pathLinksLocked && isNextLocation(path, item)}
                waitList={getLocationWait(path, item)}
                visitsCount={getLocationVisitsCount(path, item)}
                type={item.type}
                isDefaultType={item.type === item.defaultType}
                ratio={ratio}
                gameMode={mode}
              />
            )
          })}
        {mode === GameMode.PATH && (
          <PathLayer width={width} height={height} ratio={ratio} />
        )}
        {mode === GameMode.MOVEMENT && <Movements />}
      </BoardImage>
    </BoardFrame>
  )
}
