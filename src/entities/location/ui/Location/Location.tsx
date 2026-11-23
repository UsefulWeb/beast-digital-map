import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { GameMode } from '@entities/game/model'
import { BASE_URL } from '@shared/config'
import { px, scale } from '@shared/lib/math'
import { Terrain } from '../../model'
import { LocationImage } from '../LocationImage'
import { LocationWait } from '../LocationWait'

export type LocationProps = {
  onClick: () => void
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
}

const Root = styled.div`
  position: absolute;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

const WaitLayer = styled(Root)`
  z-index: 7;
`

const MainLayer = styled(Root)`
  z-index: 5;
`

const TypeLayer = styled(Root)`
  z-index: 1;
`

const HitArea = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 50%;
  cursor: pointer;

  &:hover:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 15%;
    height: 15%;
    border-radius: 50%;
    box-shadow:
      0 0 10px var(--color-hover),
      inset 0 0 10px var(--color-hover),
      0 0 30px var(--color-marker-start);
    background: radial-gradient(
      var(--color-hover),
      color-mix(in srgb, var(--color-hover) 80%, var(--color-marker-start)),
      color-mix(in srgb, var(--color-marker-start) 63%, transparent)
    );
  }
`

const terrainStyles: Partial<Record<Terrain, ReturnType<typeof css>>> = {
  [Terrain.FOREST]: css`
    background: #08960020;
  `,
  [Terrain.CAVES]: css`
    background: #80808040;
  `,
  [Terrain.SWAMP]: css`
    background-color: #75007120;
  `,
}

const Background = styled.div<{
  $terrain?: Terrain
  $modified?: boolean
  $selected?: boolean
  $first?: boolean
  $last?: boolean
  $next?: boolean
  $pathMode?: boolean
  $locationsMode?: boolean
}>`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 50%;

  ${({ $locationsMode, $terrain }) =>
    $locationsMode && $terrain ? terrainStyles[$terrain] : undefined}

  ${({ $locationsMode, $modified }) =>
    $locationsMode &&
    $modified &&
    css`
      box-shadow: 0 0 10px var(--color-marker-start);
    `}

  ${({ $pathMode, $selected }) =>
    $pathMode &&
    $selected &&
    css`
      background: var(--color-marker-visited-fill);
      box-shadow: 0 0 30px var(--color-marker-visited);
    `}

  ${({ $pathMode, $first }) =>
    $pathMode &&
    $first &&
    css`
      background: var(--color-marker-start-fill);
      box-shadow: 0 0 30px var(--color-marker-start);
    `}

  ${({ $pathMode, $last }) =>
    $pathMode &&
    $last &&
    css`
      background: var(--color-marker-end-fill);
      box-shadow: 0 0 30px var(--color-marker-end);

      &:before {
        content: '';
        position: absolute;
        display: block;
        background: url(${BASE_URL}images/ui/visit-marker.svg) center center
          no-repeat;
        background-size: 70%;
        width: 100%;
        height: 100%;
        opacity: 0.92;
        top: 0;
        left: 0;
        z-index: 1;
      }
    `}

  ${({ $locationsMode, $last }) =>
    $locationsMode &&
    $last &&
    css`
      border-radius: 50%;
      outline-offset: 0.5vw;
      outline: 0.5vw solid var(--color-marker-end);
    `}

  ${({ $next }) =>
    $next &&
    css`
      &:before {
        content: '';
        position: absolute;
        display: block;
        background: url(${BASE_URL}images/ui/location-next.svg) center center
          no-repeat;
        background-size: 100%;
        width: 180%;
        height: 180%;
        opacity: 0.92;
        top: -40%;
        left: -40%;
        z-index: 1;
        filter: drop-shadow(0 0 0.35vw rgba(0, 0, 0, 0.75))
          drop-shadow(0 0 0.9vw rgba(0, 0, 0, 0.45));
      }
    `}
`

const Counter = styled.span`
  position: relative;
  z-index: 2;
  text-shadow:
    0 0 10px #fff,
    1px 1px 0 black,
    -1px -1px 0 var(--color-hover);
  color: #fff;
`

export const Location = (props: LocationProps) => {
  const {
    isFirst,
    isLast,
    isNext,
    visitsCount,
    onClick,
    ratio,
    size,
    top,
    left,
    waitList,
    gameMode,
    type,
    isDefaultType,
  } = props

  const isSelected = visitsCount > 0
  const isPathMode = gameMode === GameMode.PATH
  const isLocationsMode = gameMode === GameMode.LOCATIONS
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

  return (
    <>
      <WaitLayer style={style}>
        <HitArea onClick={onClick} />
        {waitList.length > 0 && <LocationWait waitList={waitList} />}
      </WaitLayer>
      <MainLayer style={style}>
        <Background
          $terrain={type}
          $modified={isLocationsMode && !isDefaultType}
          $selected={showSelected}
          $first={showFirst}
          $last={isLast}
          $next={isNext}
          $pathMode={isPathMode}
          $locationsMode={isLocationsMode}
        >
          {isPathMode && visitsCount > 1 && <Counter>{visitsCount}</Counter>}
        </Background>
      </MainLayer>
      {!isDefaultType && (
        <TypeLayer style={style}>
          <LocationImage type={type} ratio={ratio} locationSize={size} />
        </TypeLayer>
      )}
    </>
  )
}
