import { GameMode } from '@entities/game/model'
import { MAP_DEBUG } from '@shared/config'
import { px, scale } from '@shared/lib/math'
import { type MapMeeple, MapMeepleType, type Terrain } from '../../model'
import { LocationImage } from '../LocationImage'
import { LocationWait } from '../LocationWait'
import { Meeple } from '../Meeple'
import * as C from './Location.components'

export type LocationProps = {
  onClick: () => void
  onMeepleInjure?: () => void
  onHover?: ((index: number | null) => void) | undefined
  visitsCount: number
  waitList: number[]
  isFirst: boolean
  isLast: boolean
  isNext: boolean
  ratio: number
  top: number
  left: number
  size: number
  type: Terrain
  gameMode: GameMode
  isDefaultType: boolean
  index: number
  meeple: MapMeeple
  /** debug: hovered node or one of its links */
  debugLink?: 'active' | 'linked' | undefined
}

export const Location = (props: LocationProps) => {
  const {
    isFirst,
    isLast,
    isNext,
    visitsCount,
    onClick,
    onMeepleInjure,
    onHover,
    ratio,
    size,
    top,
    left,
    waitList,
    gameMode,
    type,
    isDefaultType,
    index,
    meeple,
    debugLink,
  } = props

  const isSelected = visitsCount > 0
  const isPathMode = gameMode === GameMode.PATH
  const isLocationsMode = gameMode === GameMode.LOCATIONS
  const isMeepleMode = gameMode === GameMode.MEEPLE
  const k = (x: number) => px(scale(x, ratio))
  const style = {
    fontSize: k(size),
    width: k(size),
    height: k(size),
    top: k(top),
    left: k(left),
  }

  const showFirst = isPathMode && isFirst && !isLast
  const showSelected = isPathMode && isSelected && !isFirst && !isLast
  const showMeeple = isMeepleMode && meeple.type !== MapMeepleType.NO_MEEPLE

  return (
    <>
      <C.WaitLayer style={style}>
        <C.HitArea
          onClick={onClick}
          onMouseEnter={() => onHover?.(index)}
          onMouseLeave={() => onHover?.(null)}
        />
        {waitList.length > 0 && <LocationWait waitList={waitList} />}
      </C.WaitLayer>
      <C.MainLayer style={style}>
        <C.Background
          $debug={MAP_DEBUG}
          $debugLink={debugLink}
          $terrain={type}
          $modified={isLocationsMode && !isDefaultType}
          $selected={showSelected}
          $first={showFirst}
          $last={isLast}
          $next={isNext}
          $pathMode={isPathMode}
          $locationsMode={isLocationsMode}
        >
          {MAP_DEBUG && <C.DebugIndex>{index}</C.DebugIndex>}
          {isPathMode && visitsCount > 1 && (
            <C.Counter>{visitsCount}</C.Counter>
          )}
        </C.Background>
      </C.MainLayer>
      {!isDefaultType && (
        <C.TypeLayer style={style}>
          <LocationImage type={type} ratio={ratio} locationSize={size} />
        </C.TypeLayer>
      )}
      {showMeeple && onMeepleInjure && (
        <C.MeepleLayer style={style}>
          <Meeple meeple={meeple} onInjure={onMeepleInjure} />
        </C.MeepleLayer>
      )}
    </>
  )
}
