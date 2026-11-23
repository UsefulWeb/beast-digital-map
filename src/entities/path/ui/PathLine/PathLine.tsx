import styled from '@emotion/styled'
import { BASE_URL } from '@shared/config'
import type { PathMarker } from '../../lib'

const arrowImg = `${BASE_URL}images/path/arrow.svg`

/** Stroke thickness at map ratio = 1 (map native pixel space). */
const BASE_STROKE_WIDTH = 10
const BASE_MARKER_SIZE = 39
const BASE_MARKER_FONT = 23
/**
 * Arrow tip is +Y. Triangle centroid of arrow.svg is above the image
 * center (toward the base), in the wider part of the triangle.
 */
const LABEL_LOCAL_Y = -0.17

export type PathLineProps = {
  d: string
  width: number
  height: number
  ratio: number
  markers: PathMarker[]
}

const Root = styled.svg`
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
`

const Line = styled.path<{ $strokeWidth: number }>`
  fill: none;
  stroke: var(--color-path);
  stroke-width: ${({ $strokeWidth }) => $strokeWidth};
  stroke-linecap: round;
  stroke-linejoin: round;
`

export const PathLine = (props: PathLineProps) => {
  const { d, width, height, ratio, markers } = props

  const strokeWidth = Math.max(1.5, BASE_STROKE_WIDTH * ratio)
  const markerSize = Math.max(8, BASE_MARKER_SIZE * ratio)
  const markerHalf = markerSize / 2
  const markerFont = Math.max(9, BASE_MARKER_FONT * ratio)
  const labelLocalY = markerSize * LABEL_LOCAL_Y

  return (
    <Root width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {d && <Line d={d} $strokeWidth={strokeWidth} />}
      {markers.map((marker) => (
        <g
          key={marker.key}
          transform={`translate(${marker.x}, ${marker.y}) rotate(${marker.angle})`}
        >
          <image
            href={arrowImg}
            width={markerSize}
            height={markerSize}
            x={-markerHalf}
            y={-markerHalf}
            style={{
              filter: marker.isLast
                ? 'drop-shadow(0 0 2px var(--color-marker-start))'
                : 'drop-shadow(0 0 2px black)',
            }}
          />
          {/* Counter-rotate so the digit stays upright but glued to triangle center. */}
          <g
            transform={`translate(0, ${labelLocalY}) rotate(${-marker.angle})`}
          >
            <text
              x={0}
              y={0}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={markerFont}
              fontWeight={700}
              fill={
                marker.isLast ? 'var(--color-marker-start)' : 'var(--color-ink)'
              }
            >
              {marker.label}
            </text>
          </g>
        </g>
      ))}
    </Root>
  )
}
