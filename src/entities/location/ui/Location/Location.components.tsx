import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { BASE_URL } from '@shared/config'
import { Terrain } from '../../model'

export const Root = styled.div`
  position: absolute;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const WaitLayer = styled(Root)`
  z-index: 7;
`

export const MainLayer = styled(Root)`
  z-index: 5;
`

export const TypeLayer = styled(Root)`
  z-index: 1;
`

export const MeepleLayer = styled(Root)`
  z-index: 8;
  pointer-events: none;
`

export const HitArea = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 50%;
  cursor: pointer;

  @media (hover: hover) and (pointer: fine) {
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
        0 0 6px var(--color-hover),
        inset 0 0 6px var(--color-hover),
        0 0 12px var(--color-marker-start);
      background: radial-gradient(
        var(--color-hover),
        color-mix(in srgb, var(--color-hover) 80%, var(--color-marker-start)),
        color-mix(in srgb, var(--color-marker-start) 63%, transparent)
      );
    }
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

export const Background = styled.div<{
  $terrain?: Terrain
  $modified?: boolean
  $selected?: boolean
  $first?: boolean
  $last?: boolean
  $next?: boolean
  $pathMode?: boolean
  $locationsMode?: boolean
  $debug?: boolean
  $debugLink?: 'active' | 'linked' | undefined
}>`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 50%;

  /* TEMP: black circles to verify centers against map art */
  ${({ $debug }) =>
    $debug &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgb(0 0 0 / 55%);
      outline: 2px solid #000;
      outline-offset: -1px;
      box-shadow: none;
    `}

  ${({ $debug, $debugLink }) =>
    $debug &&
    $debugLink === 'active' &&
    css`
      background: rgb(255 200 0 / 70%);
      outline: 3px solid #ffc800;
      z-index: 4;
    `}

  ${({ $debug, $debugLink }) =>
    $debug &&
    $debugLink === 'linked' &&
    css`
      background: rgb(0 220 120 / 65%);
      outline: 3px solid #00dc78;
      z-index: 3;
    `}

  ${({ $locationsMode, $terrain, $debug }) =>
    !$debug && $locationsMode && $terrain ? terrainStyles[$terrain] : undefined}

  ${({ $locationsMode, $modified }) =>
    $locationsMode &&
    $modified &&
    css`
      box-shadow: 0 0 10px var(--color-marker-start);
    `}

  ${({ $debug, $pathMode, $selected }) =>
    !$debug &&
    $pathMode &&
    $selected &&
    css`
      background: var(--color-marker-visited-fill);
      box-shadow: 0 0 7px var(--color-marker-visited);
    `}

  ${({ $debug, $pathMode, $first }) =>
    !$debug &&
    $pathMode &&
    $first &&
    css`
      background: var(--color-marker-start-fill);
      box-shadow: 0 0 7px var(--color-marker-start);
    `}

  ${({ $debug, $pathMode, $last }) =>
    !$debug &&
    $pathMode &&
    $last &&
    css`
      background: var(--color-marker-end-fill);
      box-shadow: 0 0 7px var(--color-marker-end);

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

  ${({ $debug, $next }) =>
    !$debug &&
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
        filter: drop-shadow(0 0 0.2vw rgba(0, 0, 0, 0.4))
          drop-shadow(0 0 0.45vw rgba(0, 0, 0, 0.25));
      }
    `}
`

export const Counter = styled.span`
  position: relative;
  z-index: 2;
  text-shadow:
    0 0 10px #fff,
    1px 1px 0 black,
    -1px -1px 0 var(--color-hover);
  color: #fff;
`

export const DebugIndex = styled.span`
  position: relative;
  z-index: 3;
  font-size: 0.28em;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-shadow:
    0 0 2px #000,
    0 1px 2px #000,
    1px 0 2px #000;
  pointer-events: none;
  user-select: none;
`
